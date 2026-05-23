"use client";

import { Printer } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { terms, COMPANY, TERMS_VERSION, TERMS_UPDATED } from "@/lib/terms";

/**
 * /sopimusehdot page renderer.
 *
 * Web view: one continuous flowing document. The cover lockup at
 * the top, then every numbered section in order, then the
 * appendices. No paginated viewer or prev/next arrows — the page
 * scrolls naturally so the customer can find a clause with Cmd+F
 * and the screen never sits with only one paragraph on it.
 *
 * Print view (@media print in globals.css): each top-level section
 * starts on a fresh sheet via `page-break-before: always` on the
 * section heading, so the printed PDF still looks like a paper
 * contract. The print-only header band (logo + 82Rentals Oy) is
 * pinned by the print stylesheet's @page top margin.
 */
type Section = { id: string; heading: string; body: string };

export default function TermsView() {
  const { locale } = useLocale();
  const t = terms[locale === "en" ? "en" : "fi"];
  const isEn = locale === "en";
  const printLabel = isEn ? "Lataa PDF / tulosta" : "Lataa PDF / tulosta";

  const allSections: Section[] = [
    ...t.sections,
    ...t.appendices.map((a) => ({ id: a.id, heading: a.heading, body: a.body })),
  ];

  return (
    <div className="terms-print">
      {/* Toolbar — print button. Hidden in print. */}
      <div className="not-print flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary/70">
          {isEn ? "Rental agreement" : "Vuokrasopimus"}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
        >
          <Printer size={14} /> {printLabel}
        </button>
      </div>

      {/* Print-only header band that mirrors the @page chrome. The
          @page rules in globals.css repeat this on every printed
          sheet via fixed positioning; this inline copy guarantees
          the first sheet has the band even in browsers that strip
          fixed positioning during print. */}
      <div className="print-only terms-page-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="82Rentals" className="terms-page-logo" />
        <div className="terms-page-company">82Rentals Oy</div>
      </div>

      {/* Cover lockup */}
      <div className="terms-cover">
        <div className="terms-cover-eyebrow">
          {isEn ? "Rental agreement" : "Vuokrasopimus"}
        </div>
        <h1 className="terms-cover-title">{t.title}</h1>
        <p className="terms-cover-intro">{t.intro}</p>
        <div className="terms-cover-meta">
          <div className="terms-cover-meta-label">
            {isEn ? "Rental provider" : "Vuokranantaja"}
          </div>
          <div className="terms-cover-meta-value">
            {COMPANY.name}
            <br />
            {COMPANY.address}
            <br />
            {COMPANY.phone} · {COMPANY.email}
          </div>
        </div>
      </div>

      {/* Continuous body — every section + appendix in order. CSS
          (.terms-section-flow + @media print) handles compact
          spacing on screen and per-section page breaks on print. */}
      <div className="terms-flow">
        {allSections.map((s) => (
          <section key={s.id} className="terms-section-flow">
            <h2 className="terms-heading">{s.heading}</h2>
            <Paragraphs body={s.body} />
          </section>
        ))}
      </div>

      {/* Footer line (version / address) — shown in both web and
          print so the customer always knows which version they read. */}
      <div className="terms-doc-footer">
        {isEn
          ? `Version ${TERMS_VERSION}, updated ${TERMS_UPDATED}`
          : `Versio ${TERMS_VERSION}, päivitetty ${TERMS_UPDATED}`}
        {" · "}
        {COMPANY.name} · {COMPANY.address}
      </div>
    </div>
  );
}

function Paragraphs({ body }: { body: string }) {
  // Split on blank lines so each paragraph in the source string
  // renders as its own block, then promote consecutive "· "-prefixed
  // lines into a bulleted list. Lines that mix headline text and
  // bullets (e.g. "14.1. … if: · a · b · c") emit the headline as a
  // paragraph and the rest as a tight <ul>.
  const paragraphs = body.split(/\n\s*\n/);
  return (
    <div className="terms-body-text mt-2 space-y-3 leading-relaxed">
      {paragraphs.map((p, idx) => {
        const lines = p.split("\n");
        const bulletLines = lines.filter((l) => l.trim().startsWith("·"));
        const headerLines = lines.filter((l) => !l.trim().startsWith("·"));
        if (bulletLines.length > 0 && headerLines.every((l) => l.trim() === "")) {
          // Pure bullet block.
          return (
            <ul key={idx} className="terms-bullets list-none pl-0 space-y-1.5">
              {bulletLines.map((line, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden className="terms-bullet-mark select-none">
                    ·
                  </span>
                  <span>{line.replace(/^·\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (bulletLines.length > 0) {
          // Headline + bullets ("14.1. … if: · a · b · c")
          return (
            <div key={idx}>
              <p className="whitespace-pre-line">
                {headerLines.join("\n").trim()}
              </p>
              <ul className="terms-bullets list-none pl-0 mt-1.5 space-y-1.5">
                {bulletLines.map((line, j) => (
                  <li key={j} className="flex gap-2">
                    <span aria-hidden className="terms-bullet-mark select-none">
                      ·
                    </span>
                    <span>{line.replace(/^·\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
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
