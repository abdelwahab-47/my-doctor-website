"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { SignalField } from "./SignalField";
import { Reveal } from "./Reveal";
import {
  AssistantBoard,
  BrandMark,
  DoctorWindow,
  PatientPhone,
} from "./mockups";

function HeroDevices() {
  const reduce = useReducedMotion();
  const { t } = useLang();

  const float = (delay: number) =>
    reduce ? {} : { animation: `float 9s ease-in-out ${delay}s infinite` };

  return (
    <div className="relative mx-auto mt-16 w-full max-w-lg lg:mt-0">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(10,132,255,0.32), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
        <span className="h-40 w-40 rounded-full bg-care/10 blur-3xl" />
      </div>

      <div className="relative grid grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-[auto_auto] sm:gap-x-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={float(0)}
        >
          <PatientPhone />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-[248px] flex-col gap-5 sm:w-auto sm:max-w-none"
        >
          <motion.div style={float(1.6)}>
            <DoctorWindow compact />
          </motion.div>
          <motion.div style={float(3.1)}>
            <AssistantBoard compact />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-hairline bg-ink/80 px-3.5 py-1.5 text-[11px] font-medium text-fg-soft shadow-soft backdrop-blur-xl">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-care opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-care" />
        </span>
        <BrandMark size={16} className="rounded" />
        {t.hero.liveChip}
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-void pt-36 pb-24 sm:pt-40 lg:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, #0a2a52 0%, #06213a 42%, #03101f 100%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden />
      <SignalField density={1.1} />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(10,132,255,0.3), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(18,185,129,0.26), transparent 62%)" }}
      />

      <div className="shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-ink/70 px-4 py-2 text-[12px] font-medium text-fg-soft backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-care" aria-hidden />
                <span className="font-arabic">{t.hero.eyebrow}</span>
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[clamp(2.6rem,6.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-fg">
                {t.hero.headline}{" "}
                <span className="gradient-blue text-glow-blue">{t.hero.headlineAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-fg-soft sm:text-[17px]">
                {t.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <a
                  href="#apps"
                  className="btn-brand inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white"
                >
                  {t.hero.ctaPrimary}
                  <span aria-hidden className="dir-arrow">→</span>
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-ink/60 px-7 py-3.5 text-sm font-medium text-fg-soft backdrop-blur transition-colors hover:bg-surface hover:text-fg"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-faint">
                <span className="h-px w-10 bg-hairline" aria-hidden />
                {t.hero.badge}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={34}>
            <HeroDevices />
          </Reveal>
        </div>

        <div className="mt-24 flex justify-center lg:mt-28" aria-hidden>
          <span className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-faint">
            {t.hero.scroll}
            <motion.span
              animate={reduce ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="dir-arrow text-care-soft"
            >
              ↓
            </motion.span>
          </span>
        </div>
      </div>
    </section>
  );
}