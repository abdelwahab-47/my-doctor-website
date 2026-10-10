"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/dictionary";
import { useLang } from "@/lib/i18n";
import { BrandMark } from "./mockups";
import { site } from "@/data/site";

function LangSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLang();
  return (
    <div
      className={`flex items-center gap-0.5 rounded-xl border border-hairline/80 bg-void/60 p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.dir === "rtl" ? "ar" : l.code}
            dir={l.dir}
            onClick={() => setLocale(l.code as Locale)}
            aria-pressed={active}
            className={`relative rounded-lg px-2.5 py-1 text-[11.5px] font-semibold transition-colors ${
              active ? "text-fg" : "text-faint hover:text-fg-soft"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0 rounded-lg ring-1 ring-hairline"
                style={{ background: "rgba(13,31,60,0.6)" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{l.short}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const ids = ["home", ...t.nav.items.map((n) => n.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, t.nav.items]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.nav
          initial={reduce ? false : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-colors duration-500 sm:px-4 ${
            scrolled
              ? "glass-dark border-hairline/80 shadow-soft"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href={href("home")}
            className="group flex items-center gap-3 rounded-xl pr-2"
            aria-label={`${site.name} — home`}
          >
            <BrandMark size={36} className="transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden text-[15px] font-semibold tracking-tight text-fg sm:block">
              {site.name}
              <span className="ms-2 font-arabic text-muted">طبيبي</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {t.nav.items.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <a
                  key={item.id}
                  href={href(item.id)}
                  className={`relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-ink/90 ring-1 ring-hairline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LangSwitcher className="hidden sm:flex" />
            <a
              href={href("cta")}
              className="group relative hidden overflow-hidden rounded-xl px-4 py-2 text-[13px] font-semibold text-white sm:block"
              style={{ background: "linear-gradient(100deg,#1fbf8f,#0094e6)" }}
            >
              <span className="relative z-10">{t.nav.cta}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.open}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-ink/80 text-fg md:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-void/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 top-20 rounded-2xl border border-hairline bg-ink/95 p-3 shadow-soft"
            >
              <ul className="flex flex-col">
                {t.nav.items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045 }}
                  >
                    <a
                      href={href(item.id)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-fg-soft transition-colors hover:bg-surface hover:text-fg"
                    >
                      {item.label}
                      <span className="text-faint">↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 space-y-3">
                <LangSwitcher className="w-fit" />
                <a
                  href={href("cta")}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(100deg,#1fbf8f,#0094e6)" }}
                >
                  {t.nav.cta}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}