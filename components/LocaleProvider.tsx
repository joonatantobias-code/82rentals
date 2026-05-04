"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionary, type Dictionary, type Locale } from "@/lib/i18n/dictionary";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<Ctx>({
  locale: "fi",
  setLocale: () => {},
  t: dictionary.fi,
});

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("fi");

  // Hydrate from localStorage / browser language on mount
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("locale")) as Locale | null;
    if (stored === "fi" || stored === "en") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      return;
    }
    if (typeof navigator !== "undefined") {
      const guess = navigator.language?.toLowerCase().startsWith("fi")
        ? "fi"
        : "en";
      setLocaleState(guess);
      document.documentElement.lang = guess;
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", l);
      document.documentElement.lang = l;
    }
  }

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: dictionary[locale] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  return useContext(LocaleContext).t;
}
