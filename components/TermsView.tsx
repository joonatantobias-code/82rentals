"use client";

import { useLocale } from "@/components/LocaleProvider";
import { terms, TERMS_VERSION, TERMS_UPDATED } from "@/lib/terms";

export default function TermsView() {
  const { locale } = useLocale();
  const t = terms[locale === "en" ? "en" : "fi"];

  return (
    <div className="space-y-5">
      <div className="text-xs text-brand-secondary/60">
        Versio {TERMS_VERSION} · päivitetty {TERMS_UPDATED}
      </div>
      {t.sections.map((s, i) => (
        <section key={i}>
          <h3 className="font-display font-bold text-brand-secondary text-lg">
            {s.heading}
          </h3>
          <p className="text-sm text-brand-secondary/85 mt-1.5 leading-relaxed">
            {s.body}
          </p>
        </section>
      ))}
    </div>
  );
}
