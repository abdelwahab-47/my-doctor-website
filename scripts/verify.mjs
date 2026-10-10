import puppeteer from "puppeteer-core";

const CHROME =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3344";

const pages = [{ path: "/", label: "home" }];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function summarizeErrors(consoleErrors) {
  if (!consoleErrors.length) return "none";
  const collapsed = [];
  for (const e of consoleErrors) {
    const key = `${e.type}::${e.text.slice(0, 140)}`;
    if (!collapsed.some((c) => c.key === key)) collapsed.push({ key, count: 1 });
    else collapsed.find((c) => c.key === key).count++;
  }
  return collapsed.map((c) => `${c.key} ×${c.count}`).join(" | ");
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const results = [];

for (const page of pages) {
  for (const vp of viewports) {
    const ctx = await browser.createBrowserContext();
    const p = await ctx.newPage();
    await p.setViewport(vp);

    const consoleErrors = [];
    const pageErrors = [];
    p.on("console", (msg) => {
      if (["error", "warning"].includes(msg.type())) {
        consoleErrors.push({ type: msg.type(), text: msg.text() });
      }
    });
    p.on("pageerror", (err) => pageErrors.push(String(err)));
    p.on("requestfailed", (req) =>
      consoleErrors.push({ type: "req", text: `${req.url()} :: ${req.failure()?.errorText}` })
    );

    await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle0", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1200));

    const layout = await p.evaluate(() => {
      const doc = document.documentElement;
      const overflowX = doc.scrollWidth - doc.clientWidth;
      const offenders = [];
      if (overflowX > 0) {
        const all = document.querySelectorAll("body *");
        for (const el of all) {
          const r = el.getBoundingClientRect();
          if (r.width <= 0) continue;
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            let el2 = el;
            let hidden = false;
            while (el2 && el2 !== document.body) {
              const cs = getComputedStyle(el2);
              if (cs.overflowX === "hidden" || cs.position === "fixed" || cs.display === "none") { hidden = true; break; }
              el2 = el2.parentElement;
            }
            if (!hidden) {
              offenders.push(`${el.tagName.toLowerCase()}.${el.className}`.slice(0, 90));
            }
          }
        }
      }
      return { overflowX, offenders: [...new Set(offenders)].slice(0, 12) };
    });

    // verify hash anchors exist on home
    let brokenAnchors = [];
    if (page.path === "/") {
      brokenAnchors = await p.evaluate(() => {
        const bad = [];
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          const id = a.getAttribute("href").slice(1);
          if (id && !document.getElementById(id)) bad.push(`#${id}`);
        });
        return bad;
      });
    }

    results.push({
      page: page.label,
      vp: vp.name,
      console: summarizeErrors(consoleErrors),
      pageErrors: pageErrors.length,
      overflowX: layout.overflowX,
      offenders: layout.offenders.length,
      brokenAnchors,
    });
    await ctx.close();
  }
}

// Reduced motion pass on home
{
  const ctx = await browser.createBrowserContext();
  const p = await ctx.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 800));
  const vis = await p.evaluate(() => {
    const h1 = document.querySelector("h1");
    const lang = document.querySelector("html").getAttribute("dir");
    return {
      h1Opacity: h1 ? getComputedStyle(h1).opacity : null,
      htmlDir: lang,
    };
  });
  results.push({ page: "home-reduced", vp: "reduced", console: summarizeErrors(errors), pageErrors: 0, overflowX: 0, offenders: 0, brokenAnchors: [], vis });
  await ctx.close();
}

await browser.close();

let failed = false;
for (const r of results) {
  const problemas = [
    r.console !== "none" ? r.console : null,
    r.pageErrors ? `pageErrors:${r.pageErrors}` : null,
    r.overflowX > 0 ? `overflowX:+${r.overflowX} (${r.offenders} offenders)` : null,
    r.brokenAnchors?.length ? `brokenAnchors:${r.brokenAnchors.join(",")}` : null,
  ].filter(Boolean);
  if (problemas.length) failed = true;
  console.log(
    `${r.page.padEnd(20)} ${r.vp.padEnd(9)} ${problemas.length ? "!! " + problemas.join(" | ") : "OK"}${r.vis ? ` vis=${JSON.stringify(r.vis)}` : ""}`
  );
}
console.log(failed ? "\nRESULT: issues found" : "\nRESULT: all checks clean");
process.exit(failed ? 1 : 0);