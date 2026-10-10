"use client";

import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SystemDiagram } from "./SystemDiagram";

export function EcosystemSection() {
  const { t } = useLang();

  return (
    <section id="ecosystem" className="relative scroll-mt-24 overflow-hidden bg-void py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, #082441 0%, #03101f 55%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(10,132,255,0.4), transparent 70%)" }}
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading
            index="04"
            kicker={t.eco.eyebrow}
            tone="dark"
            className="max-w-full"
          >
            {t.eco.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="text-[15px] leading-relaxed text-muted lg:pb-1">
              {t.eco.sub}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-3" gap={0.12}>
          {t.eco.bullets.map((b) => (
            <StaggerItem key={b.t}>
              <div className="h-full rounded-2xl border border-hairline bg-ink/60 p-6 backdrop-blur transition-colors duration-300 hover:border-care/30">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-care/30 bg-care/10 text-care" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2 L4 14 h6 l-1 8 9-12h-6z" fill="currentColor" />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight text-fg">
                  {b.t}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{b.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-hairline bg-ink/50 p-5 shadow-soft backdrop-blur sm:p-10">
            <h3 className="sr-only">{t.eco.title}</h3>
            <SystemDiagram
              labels={{
                hub: t.eco.hub,
                hubSub: t.eco.hubSub,
                nodes: t.eco.nodes,
              }}
            />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13.5px] leading-relaxed text-muted">
            {t.eco.desc}
          </p>
        </Reveal>
      </div>
    </section>
  );
}