"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SignalField } from "./SignalField";
import { site } from "@/data/site";

export function CtaSection() {
  const { t } = useLang();

  return (
    <section id="cta" className="relative scroll-mt-24 overflow-hidden bg-void py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, #082441 0%, #03101f 60%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <SignalField density={0.7} />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(18,185,129,0.35), transparent 65%)" }}
      />

      <div className="shell relative text-center">
        <Reveal>
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-care-soft">
            {t.cta.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
            {t.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">
            {t.cta.sub}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-semibold text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.2.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              {t.cta.primary}
            </a>
            <a
              href="#apps"
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-ink/70 px-8 py-4 text-sm font-medium text-fg-soft backdrop-blur transition-colors hover:bg-surface hover:text-fg"
            >
              {t.cta.secondary}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-7 text-[12.5px] text-faint">{t.cta.note}</p>
        </Reveal>
      </div>
    </section>
  );
}