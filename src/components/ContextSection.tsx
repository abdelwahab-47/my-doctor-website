"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function ContextSection() {
  const { t } = useLang();

  return (
    <section id="context" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            index="06"
            kicker={t.context.eyebrow}
            align="center"
            className="mx-auto max-w-2xl text-center"
          >
            {t.context.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-lmuted">
              {t.context.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-ledge bg-lbg p-7 sm:p-8">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-lfaint">
                  EN · FR · ع
                </p>
                <Stagger className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" gap={0.1}>
                  {t.context.langs.map((lang) => {
                    const isAr = lang.name === "العربية";
                    return (
                      <StaggerItem key={lang.name}>
                        <div
                          className={`rounded-2xl border bg-white p-4 ${
                            isAr ? "border-care/40 shadow-[0_16px_44px_-22px_rgba(18,185,129,0.5)]" : "border-ledge"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p
                              className={`font-display text-[17px] font-semibold text-ltext ${
                                isAr ? "font-arabic" : ""
                              }`}
                              dir={isAr ? "rtl" : "ltr"}
                            >
                              {lang.name}
                            </p>
                            {isAr && (
                              <span className="rounded-full bg-care/12 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-care">
                                RTL
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-lmuted">
                            {lang.d}
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center gap-4">
            {t.context.points.map((p, i) => (
              <Reveal key={p.t} delay={0.08 + i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-ledge bg-lbg p-6">
                  <span
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg,#12b981,#0096f2)" }}
                    aria-hidden
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12 L9 17 L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold tracking-tight text-ltext">
                      {p.t}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-lmuted">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}