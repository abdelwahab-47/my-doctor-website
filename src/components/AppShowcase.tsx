"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { AssistantBoard, DoctorWindow, PatientPhone } from "./mockups";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type BlockId = "patient" | "doctor" | "assistant";

const blockIds: BlockId[] = ["patient", "doctor", "assistant"];

const hashTab = (): BlockId | null => {
  if (typeof window === "undefined") return null;
  const h = window.location.hash.replace("#", "");
  return blockIds.includes(h as BlockId) ? (h as BlockId) : null;
};

const mock = (id: BlockId) => {
  switch (id) {
    case "patient":
      return <PatientPhone showSearch />;
    case "doctor":
      return <DoctorWindow />;
    case "assistant":
      return <AssistantBoard />;
  }
};

export function AppShowcase() {
  const { t, locale } = useLang();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<BlockId>(() => hashTab() ?? "patient");
  const block = t.apps.blocks.find((b) => b.id === tab) ?? t.apps.blocks[0];

  useEffect(() => {
    const onHash = () => {
      const next = hashTab();
      if (next) setTab(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-ledge bg-white shadow-card">
      <div className="border-b border-ledge bg-lbg/60 px-4 py-3.5 sm:px-6">
        <div
          role="tablist"
          aria-label={t.apps.eyebrow}
          className="flex gap-1 overflow-x-auto rounded-xl border border-ledge bg-white p-1"
        >
          {t.apps.blocks.map((b) => {
            const active = tab === b.id;
            return (
              <button
                key={b.id}
                id={`app-tab-${b.id}`}
                role="tab"
                aria-selected={active}
                aria-controls="app-panel"
                type="button"
                onClick={() => setTab(b.id as BlockId)}
                className={`relative shrink-0 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${
                  active ? "text-white" : "text-lmuted hover:text-ltext"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="app-tab-bg"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "linear-gradient(100deg,#1fbf8f,#0094e6)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {b.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] ${
                      active ? "bg-white/20 text-white" : "bg-ledge text-lfaint"
                    }`}
                  >
                    {b.tag}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="app-panel"
        role="tabpanel"
        aria-labelledby={`app-tab-${tab}`}
        className="relative min-h-[420px] sm:min-h-[460px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${locale}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-14"
          >
            <div>
              <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ltext">
                {block.headline}
              </h3>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-lmuted">
                {block.desc}
              </p>
              <Stagger className="mt-7 grid gap-2.5" gap={0.07}>
                {block.bullets.map((bullet) => (
                  <StaggerItem key={bullet}>
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-care/12 text-[11px] text-care"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <p className="text-[14px] leading-relaxed text-ltext/90">
                        {bullet}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1}>
              <div className="relative mx-auto grid place-items-center rounded-[2rem] bg-gradient-to-b from-lbg to-ledge/50 px-8 py-12 lg:px-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-6 rounded-[2rem] opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 50% 40%, rgba(10,132,255,0.28), transparent 70%)",
                  }}
                />
                <div className="relative">{mock(tab as BlockId)}</div>
              </div>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AppsSection() {
  const { t } = useLang();
  return (
    <section id="apps" className="relative scroll-mt-24 overflow-hidden bg-lbg py-24 sm:py-28">
      <div className="grid-lines-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            index="02"
            kicker={t.apps.eyebrow}
            align="center"
            className="mx-auto max-w-2xl text-center"
          >
            {t.apps.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-lmuted">
              {t.apps.sub}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-12">
          <AppShowcase />
        </Reveal>
      </div>
    </section>
  );
}