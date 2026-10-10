"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { QueuePanel } from "./QueuePanel";

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28">
      <div className="shell">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading index="03" kicker={t.how.eyebrow}>
              {t.how.title}
            </SectionHeading>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-lmuted">{t.how.sub}</p>
            </Reveal>

            <Stagger className="mt-10 space-y-0" gap={0.08}>
              {t.how.steps.map((step, i) => (
                <StaggerItem key={step.t}>
                  <div className="group relative flex gap-5 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-[15px] font-bold text-white shadow-[0_10px_26px_-12px_rgba(10,132,255,0.9)]"
                        style={{
                          background:
                            "linear-gradient(135deg,#2db3ff,#0a84ff 55%,#0066cc)",
                        }}
                      >
                        {i + 1}
                      </span>
                      {i < t.how.steps.length - 1 && (
                        <span
                          aria-hidden
                          className="mt-2 w-px flex-1 bg-gradient-to-b from-azure/40 to-transparent"
                        />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-display text-[17px] font-semibold tracking-tight text-ltext">
                        {step.t}
                      </h3>
                      <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-lmuted">
                        {step.d}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <QueuePanel />
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-care/30 bg-care/8 p-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-care text-[12px] font-bold text-white" aria-hidden>
                  ✓
                </span>
                <p className="text-[13.5px] leading-relaxed text-ltext/90">
                  {t.how.note}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}