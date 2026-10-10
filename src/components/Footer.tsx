"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/data/site";
import { BrandMark } from "./mockups";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(10,132,255,0.16), transparent 70%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="shell relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <BrandMark size={40} />
            <span className="font-display text-lg font-semibold tracking-tight text-fg">
              {site.name}
              <span className="ms-2 font-arabic text-muted">طبيبي</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">{t.footer.line}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-ink/70 px-3 py-1.5 text-[11px] font-medium text-fg-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-care" aria-hidden />
            {t.footer.status}
          </p>
        </div>

        <nav aria-label={t.footer.explore}>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-faint">
            {t.footer.explore}
          </p>
          <ul className="mt-5 space-y-3">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-faint">
            {t.footer.connect}
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                GitHub <span className="text-faint">@{site.githubHandle}</span>
              </a>
            </li>
            <li>
              <a
                href="#cta"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell relative flex flex-col gap-3 border-t border-hairline/60 py-7 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name} · طبيبي. {t.footer.rights}
        </p>
        <p className="text-faint/80">{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}