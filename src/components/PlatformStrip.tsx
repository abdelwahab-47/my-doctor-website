"use client";

import { useLang } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { BrandMark } from "./mockups";

export function PlatformStrip() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-lbg pb-20 pt-24 sm:pb-24">
      <div className="grid-lines-light mask-fade-x pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60" aria-hidden />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[clamp(1.5rem,3.4vw,2.3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ltext">
            {t.intro.title}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-lmuted">
            {t.intro.sub}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-3" gap={0.12}>
          {t.intro.apps.map((app) => (
            <StaggerItem key={app.id}>
              <a
                href="#apps"
                className="group flex h-full flex-col rounded-2xl border border-ledge bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-care/40 hover:shadow-[0_24px_60px_-32px_rgba(10,132,255,0.45)]"
              >
                <div className="flex items-center justify-between">
                  <BrandMark size={38} className="rounded-[0.8rem]" />
                  <span
                    aria-hidden
                    className="text-lfaint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-care dir-arrow"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight text-ltext">
                  {app.label}
                </h3>
                <p className="mt-1.5 text-sm text-lmuted">{app.role}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}