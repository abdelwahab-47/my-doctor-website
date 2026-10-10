"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-lbg py-24 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="07" kicker={t.faq.eyebrow}>
            {t.faq.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] leading-relaxed text-lmuted">{t.faq.sub}</p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border bg-white transition-colors duration-300 ${
                    isOpen ? "border-care/40 shadow-card" : "border-ledge"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="font-display text-[16px] font-semibold tracking-tight text-ltext">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-all duration-300 ${
                        isOpen
                          ? "bg-care text-white rotate-135"
                          : "bg-lbg text-lfaint ring-1 ring-ledge"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-ledge/80 px-6 py-5 text-[14px] leading-relaxed text-lmuted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}