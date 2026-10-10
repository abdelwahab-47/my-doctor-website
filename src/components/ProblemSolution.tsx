"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function ProblemSolution() {
  const { t } = useLang();

  return (
    <section id="why" className="relative scroll-mt-24 bg-white py-24 sm:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading index="01" kicker={t.problem.eyebrow}>
              {t.problem.title}
            </SectionHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-lmuted">
                {t.problem.body}
              </p>
            </Reveal>
            <Stagger className="mt-9 space-y-4" delay={0.15} gap={0.12}>
              {t.problem.points.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-3.5">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-care/12 text-[11px] font-bold text-care"
                      aria-hidden
                    >
                      !
                    </span>
                    <p className="text-[15px] leading-relaxed text-lmuted">{point}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:pt-10">
            <Reveal>
              <div className="h-full rounded-3xl border border-ledge bg-lbg p-8 shadow-card sm:p-10">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full border border-care/30 bg-care/12 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-care">
                    {t.problem.solution.eyebrow}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[clamp(1.4rem,3vw,1.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ltext">
                  {t.problem.solution.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-lmuted">
                  {t.problem.solution.body}
                </p>
                <Stagger className="mt-8 space-y-3" gap={0.1}>
                  {t.problem.solution.points.map((p) => (
                    <StaggerItem key={p.t}>
                      <div className="flex items-start gap-3 rounded-xl border border-ledge bg-white p-4">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-care/12 text-[11px] text-care" aria-hidden>
                          ✓
                        </span>
                        <div>
                          <p className="text-[14px] font-semibold text-ltext">{p.t}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-lmuted">{p.d}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}