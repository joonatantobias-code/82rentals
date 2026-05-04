"use client";

import { useLocale } from "./LocaleProvider";

export default function LanguageSwitcher({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const { locale, setLocale } = useLocale();

  const baseTrack =
    tone === "dark"
      ? "bg-white/10 border border-white/20"
      : "bg-brand-primary-50 border border-brand-primary/30";
  const inactiveText =
    tone === "dark"
      ? "text-white/70 hover:text-white"
      : "text-brand-secondary/65 hover:text-brand-secondary";
  const activeBg =
    tone === "dark"
      ? "bg-white text-brand-secondary"
      : "bg-brand-secondary text-white";

  return (
    <div
      className={`relative inline-flex items-center rounded-full p-0.5 text-[11px] font-bold uppercase tracking-wider ${baseTrack}`}
      role="group"
      aria-label="Language"
    >
      {(["fi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            locale === l ? activeBg : inactiveText
          }`}
          aria-pressed={locale === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
