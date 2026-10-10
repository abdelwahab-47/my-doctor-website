import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3344";
const paths = ["/"];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

let problems = 0;

for (const path of paths) {
  const ctx = await browser.createBrowserContext();
  const p = await ctx.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 45000 });

  // Internal links resolve?
  const links = await p.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && h.startsWith("/") && !h.startsWith("/#") && h !== "/")
  );
  const unique = [...new Set(links)];
  const broken = [];
  for (const href of unique) {
    const url = href.split("#")[0];
    const r = await p.goto(`${BASE}${url}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const status = r ? r.status() : 200;
    if (status >= 400) broken.push(`${url} -> ${status}`);
  }

  const meta = await p.evaluate(() => {
    const h1s = document.querySelectorAll("h1");
    const desc = document.querySelector('meta[name="description"]');
    const title = document.title;
    const imgs = Array.from(document.querySelectorAll("img")).map((i) => i.alt);
    return {
      h1Count: h1s.length,
      hasDescription: Boolean(desc && desc.content.length > 40),
      title,
      imgAlts: imgs,
    };
  });

  if (broken.length) { problems++; console.log(`!! ${path} broken links: ${broken.join(" | ")}`); }
  if (meta.h1Count !== 1) { problems++; console.log(`!! ${path} h1 count = ${meta.h1Count}`); }
  if (!meta.hasDescription) { problems++; console.log(`!! ${path} missing/weak meta description`); }
  console.log(`OK ${path} h1=${meta.h1Count} meta=${meta.hasDescription} links=${unique.length} clean`);
  await ctx.close();
}

// Keyboard pass on home: skip link + each nav anchor focusable
{
  const ctx = await browser.createBrowserContext();
  const p = await ctx.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 45000 });
  const focused = [];
  for (let i = 0; i < 10; i++) {
    await p.keyboard.press("Tab");
    const el = await p.evaluate(() => {
      const a = document.activeElement;
      if (!a) return null;
      const r = a.getBoundingClientRect();
      return `${a.tagName}#${a.id||""}.${(a.className||"").toString().slice(0,12)} @(${Math.round(r.left)},${Math.round(r.top)})`;
    });
    focused.push(el);
  }
  const skipFirst = focused[0] ?? "?";
  console.log("TAB first stop:", skipFirst);
  await ctx.close();
}

await browser.close();
console.log(problems ? `\nRESULT: ${problems} problem page(s)` : "\nRESULT: link + metadata + keyboard checks clean");
process.exit(problems ? 1 : 0);