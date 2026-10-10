"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { BrandMark } from "./mockups";

export function QueuePanel({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const { t } = useLang();
  const u = t.ui.doctor;

  const rows = [
    { pos: 1, time: "09:00", label: u.inConsult, state: "now", note: null as string | null },
    { pos: 2, time: "09:30", label: u.upNext, state: "next", note: null },
    { pos: 3, time: "10:00", label: u.fixed, state: "wait", note: u.atBooking },
    { pos: 4, time: "10:30", label: u.dynamic, state: "wait", note: u.recalc },
    { pos: 5, time: "11:00", label: u.dynamic, state: "wait", note: u.recalc },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ledge bg-white shadow-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(18,185,129,0.14), transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-3 border-b border-ledge px-5 py-4">
        <div className="flex items-center gap-3">
          <BrandMark size={34} />
          <div>
            <p className="text-sm font-semibold leading-tight text-ltext">
              My Doctor
            </p>
            <p className="text-[11px] leading-tight text-lfaint">
              {t.ui.queue.subtitle}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-care/30 bg-care/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-care">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-care opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-care" />
          </span>
          {t.hero.liveChip}
        </span>
      </div>

      <div className="relative space-y-1.5 p-3">
        {rows.map((row, i) => {
          const isNow = row.state === "now";
          return (
            <motion.div
              key={row.pos}
              initial={reduce ? false : { opacity: 0, x: -14 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                isNow
                  ? "border-care/35 bg-care/8"
                  : "border-ledge bg-lbg/60"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm tabular-nums ${
                  isNow
                    ? "bg-care text-white"
                    : "bg-white text-lmuted ring-1 ring-ledge"
                }`}
              >
                {row.pos}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-[13px] font-semibold ${
                    isNow ? "text-ltext" : "text-lmuted"
                  }`}
                >
                  {row.label}
                </p>
                {!compact && row.note && (
                  <p className="truncate text-[11px] text-lfaint">{row.note}</p>
                )}
              </div>
              <span
                className={`shrink-0 font-mono text-[12px] tabular-nums ${
                  isNow ? "text-care" : "text-lfaint"
                }`}
              >
                {row.time}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="relative flex items-center gap-2 border-t border-ledge px-5 py-3.5">
        {t.ui.badges.map((b) => (
          <span
            key={b}
            className="rounded-md bg-lbg px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-lfaint ring-1 ring-ledge"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}