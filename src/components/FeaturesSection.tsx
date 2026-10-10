"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const icons: Record<string, string> = {
  patient: "℞",
  doctor: "⚕",
  assistant: "◫",
};

export function FeaturesSection() {
  const { t } = useLang();

  return (
    <section id="features" className="relative scroll-mt-24 bg-lbg py-24 sm:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            index="05"
            kicker={t.features.eyebrow}
            align="center"
            className="mx-auto max-w-2xl text-center"
          >
            {t.features.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-lmuted">
              {t.features.sub}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.14}>
          {t.features.groups.map((g) => (
            <StaggerItem key={g.id} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-ledge bg-white p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-care to-care-blue font-display text-[15px] text-white shadow-[0_10px_26px_-12px_rgba(10,132,255,0.9)]" aria-hidden>
                    {icons[g.id] ?? "•"}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold tracking-tight text-ltext">
                    {g.label}
                  </h3>
                </div>
                <ul className="mt-6 space-y-0">
                  {g.items.map((f) => (
                    <li
                      key={f.t}
                      className="group flex items-start gap-3 border-b border-ledge/70 py-3.5 last:border-0"
                    >
                      <span
                        className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-md bg-care/12 text-[10px] font-bold text-care transition-colors group-hover:bg-care group-hover:text-white"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold leading-snug text-ltext">
                          {f.t}
                        </p>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-lmuted">
                          {f.d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}