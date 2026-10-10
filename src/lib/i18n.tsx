"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  locales,
  type Dictionary,
  type Locale,
} from "./dictionary";

interface LangContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (l: Locale) => void;
}

const STORAGE_KEY = "mydoctor_lang";

const LangContext = createContext<LangContextValue | null>(null);

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LocaleProvider>");
  return ctx;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "fr" || stored === "ar") {
        setLocaleState(stored);
      }
    } catch {
      /* noop */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<LangContextValue>(() => {
    const meta = locales.find((l) => l.code === locale) ?? locales[0];
    return { locale, dir: meta.dir, t: dictionaries[locale], setLocale };
  }, [locale, setLocale]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = value.dir;
  }, [locale, value.dir]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}