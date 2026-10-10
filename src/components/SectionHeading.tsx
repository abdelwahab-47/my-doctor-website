import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  kicker,
  title,
  children,
  align = "left",
  tone = "light",
  className = "",
}: {
  index?: string;
  kicker: string;
  title?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.2em] text-care-blue/80">
            {index}
          </span>
        )}
        <span className="flex items-center gap-2">
          <i className="h-1.5 w-1.5 rounded-full bg-care" aria-hidden />
          <span
            className={`font-display text-[11px] uppercase tracking-[0.28em] ${
              dark ? "text-faint" : "text-lfaint"
            }`}
          >
            {kicker}
          </span>
        </span>
      </div>
      <h2
        className={`mt-5 font-display text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.02em] ${
          dark ? "text-fg" : "text-ltext"
        }`}
      >
        {title ?? children}
      </h2>
      {title && children && (
        <p
          className={`mt-5 text-[15px] leading-relaxed sm:text-[15.5px] ${
            dark ? "text-muted" : "text-lmuted"
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}