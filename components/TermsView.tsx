"use client";

import { Printer } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { terms, TERMS_VERSION, TERMS_UPDATED } from "@/lib/terms";

/**
 * Renders the full booking terms document. The data lives in
 * `lib/terms.ts` as paragraph-broken strings; this component splits
 * each section's body on blank lines and renders the resulting
 * paragraphs. Lines that begin with the middle dot ("·") are grouped
 * into a `<ul>` so the cost-list reads as a real list, not a wall of
 * text.
 *
 * Print styling: `.terms-print` is the only thing visible when the
 * user hits Tulosta / Print, so the page comes out black-and-white,
 * single-column and reflowed for paper. The browser's built-in
 * "Save as PDF" gives the customer a clean PDF without us needing a
 * server-side renderer.
 */
export default function TermsView() {
  const { locale } = useLocale();
  const t = terms[locale === "en" ? "en" : "fi"];
  const versionLabel = locale === "en" ? "Version" : "Versio";
  const updatedLabel = locale === "en" ? "updated" : "päivitetty";
  const printLabel = locale === "en" ? "Save as PDF / Print" : "Lataa PDF / tulosta";

  return (
    <div className="terms-print">
      <div className="not-print flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="text-xs text-brand-secondary/60">
          {versionLabel} {TERMS_VERSION} · {updatedLabel} {TERMS_UPDATED}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
        >
          <Printer size={14} /> {printLabel}
        </button>
      </div>

      <header className="mb-8 print-only">
        <h1 className="font-display text-2xl font-extrabold text-brand-secondary">
          {t.title}
        </h1>
        <p className="text-xs text-brand-secondary/70 mt-1">
          {versionLabel} {TERMS_VERSION} · {updatedLabel} {TERMS_UPDATED}
        </p>
      </header>

      <Paragraphs body={t.intro} muted />

      <div className="space-y-6 mt-8">
        {t.sections.map((s) => (
          <section key={s.id} className="terms-section">
            <h3 className="font-display font-bold text-brand-secondary text-lg">
              {s.heading}
            </h3>
            <Paragraphs body={s.body} />
          </section>
        ))}
      </div>

      {t.appendices.length > 0 && (
        <div className="mt-12 pt-8 border-t border-brand-primary/30 space-y-8">
          {t.appendices.map((a) => (
            <section key={a.id} className="terms-section">
              <h3 className="font-display font-bold text-brand-secondary text-lg">
                {a.heading}
              </h3>
              <Paragraphs body={a.body} />
            </section>
          ))}
        </div>
      )}

      <footer className="mt-10 pt-6 border-t border-brand-primary/20 text-xs text-brand-secondary/65 leading-relaxed">
        {t.footer}
      </footer>
    </div>
  );
}

function Paragraphs({ body, muted }: { body: string; muted?: boolean }) {
  // Split on blank lines so each paragraph in the source string
  // renders as its own block, then promote consecutive "· "-prefixed
  // lines into a bulleted list.
  const paragraphs = body.split(/\n\s*\n/);
  return (
    <div className={`mt-2 space-y-3 text-sm leading-relaxed ${muted ? "text-brand-secondary/75" : "text-brand-secondary/85"}`}>
      {paragraphs.map((p, idx) => {
        const lines = p.split("\n");
        const bulletLines = lines.filter((l) => l.trim().startsWith("·"));
        if (bulletLines.length > 0 && bulletLines.length === lines.length) {
          return (
            <ul key={idx} className="list-none pl-0 space-y-1.5">
              {bulletLines.map((line, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden className="text-brand-primary-600 select-none">
                    ·
                  </span>
                  <span>{line.replace(/^·\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        );
      })}
    </div>
  );
}
