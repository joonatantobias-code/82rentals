"use client";

import { Printer } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { terms, TERMS_VERSION, TERMS_UPDATED, COMPANY } from "@/lib/terms";

/**
 * Renders the full booking terms document.
 *
 * Two parallel layouts come out of this component:
 *
 *   Web view (default) — colourful brand chrome from globals.css,
 *   shown on /sopimusehdot for casual reading.
 *
 *   Print/PDF view — keyed off `.terms-print` plus the @media print
 *   rules in globals.css. The print stylesheet keeps the brand
 *   typography (Inter + Poppins, navy / sky-blue accents) but
 *   simplifies the surrounding chrome: a navy header band runs
 *   across the top with the 82Rentals logo and document title, the
 *   numbered section markers sit in a left column tinted in
 *   brand-secondary, and a footer line carries the version + page
 *   counter. On a black-and-white printer all of this prints as
 *   clean grayscale; on a colour printer it prints in brand.
 */
export default function TermsView() {
  const { locale } = useLocale();
  const t = terms[locale === "en" ? "en" : "fi"];
  const isEn = locale === "en";
  const versionLabel = isEn ? "Version" : "Versio";
  const updatedLabel = isEn ? "updated" : "päivitetty";
  const printLabel = isEn ? "Save as PDF / Print" : "Lataa PDF / tulosta";
  const tocLabel = isEn ? "Contents" : "Sisältö";
  const pageLabel = isEn ? "Page" : "Sivu";

  return (
    <div className="terms-print">
      {/* ============================================================
       *  TOP TOOLBAR — visible on screen only. The print button
       *  triggers the browser's native print dialog, from which the
       *  user can "Save as PDF" with the brand chrome below baked in.
       *  ============================================================ */}
      <div className="not-print flex flex-wrap items-center justify-between gap-3 mb-6">
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

      {/* ============================================================
       *  PRINT-ONLY HERO — the cover band that runs across the top
       *  of the first printed page. Logo + document title + version
       *  on a navy surface. CSS in globals.css gives this a fixed
       *  header treatment so it also repeats on subsequent pages on
       *  browsers that honour position:fixed during print.
       *  ============================================================ */}
      <div className="print-only terms-pdf-header">
        <div className="terms-pdf-header-inner">
          <div className="terms-pdf-brand">
            <span className="terms-pdf-brand-mark">82</span>
            <span className="terms-pdf-brand-name">Rentals</span>
          </div>
          <div className="terms-pdf-header-meta">
            <div className="terms-pdf-header-title">{t.title}</div>
            <div className="terms-pdf-header-sub">
              {versionLabel} {TERMS_VERSION} · {updatedLabel} {TERMS_UPDATED}
            </div>
          </div>
        </div>
      </div>

      {/* Print-only cover block: gives the first page a proper
       *  document title + a one-paragraph intro before the
       *  numbered sections start. */}
      <header className="print-only terms-pdf-cover">
        <div className="terms-pdf-cover-eyebrow">
          {isEn ? "Rental agreement" : "Vuokrasopimus"}
        </div>
        <h1 className="terms-pdf-cover-title">{t.title}</h1>
        <p className="terms-pdf-cover-intro">{t.intro}</p>
      </header>

      {/* ============================================================
       *  WEB-ONLY DOCUMENT META + INTRO — replaced by the cover
       *  block above when printing.
       *  ============================================================ */}
      <div className="not-print">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary-600 mb-2">
          {isEn ? "Rental agreement" : "Vuokrasopimus"}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-secondary leading-tight">
          {t.title}
        </h1>
        <p className="mt-4 text-brand-secondary/75 leading-relaxed text-base">
          {t.intro}
        </p>

        {/* On-screen table of contents — quick jump to any section.
         *  Hidden in print to keep the printed contract clean. */}
        <nav
          aria-label={tocLabel}
          className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-primary-50/60 p-5"
        >
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary/70 mb-3">
            {tocLabel}
          </div>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {t.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#section-${s.id}`}
                  className="text-brand-secondary/80 hover:text-brand-primary-700 underline decoration-brand-primary/40 underline-offset-2"
                >
                  {s.heading}
                </a>
              </li>
            ))}
            {t.appendices.map((a) => (
              <li key={a.id}>
                <a
                  href={`#section-${a.id}`}
                  className="text-brand-secondary/80 hover:text-brand-primary-700 underline decoration-brand-primary/40 underline-offset-2"
                >
                  {a.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* ============================================================
       *  MAIN BODY — numbered sections rendered with brand
       *  typography. Each section uses .terms-section for
       *  page-break-inside: avoid in print.
       *  ============================================================ */}
      <div className="terms-body mt-10">
        {t.sections.map((s) => (
          <section
            key={s.id}
            id={`section-${s.id}`}
            className="terms-section"
          >
            <h3 className="terms-heading">{s.heading}</h3>
            <Paragraphs body={s.body} />
          </section>
        ))}
      </div>

      {t.appendices.length > 0 && (
        <div className="terms-body terms-appendix-block mt-12 pt-8 border-t border-brand-primary/30">
          {t.appendices.map((a) => (
            <section
              key={a.id}
              id={`section-${a.id}`}
              className="terms-section"
            >
              <h3 className="terms-heading">{a.heading}</h3>
              <Paragraphs body={a.body} />
            </section>
          ))}
        </div>
      )}

      {/* ============================================================
       *  FOOTER — on screen this is a muted single-line credit.
       *  In print the document footer (version + page number) is
       *  injected by @page rules in globals.css so the contract
       *  paginates like a real legal document.
       *  ============================================================ */}
      <footer className="mt-10 pt-6 border-t border-brand-primary/20 text-xs text-brand-secondary/65 leading-relaxed not-print">
        {t.footer}
      </footer>

      <div className="print-only terms-pdf-signature">
        <div className="terms-pdf-signature-line" />
        <div className="terms-pdf-signature-caption">
          {isEn
            ? "By confirming the booking, the renter accepts these terms."
            : "Varauksen vahvistamalla vuokralainen hyväksyy nämä ehdot."}
        </div>
        <div className="terms-pdf-signature-company">
          {COMPANY.name} · {COMPANY.address}
          <br />
          {COMPANY.email} · {COMPANY.phone}
        </div>
        <div className="terms-pdf-signature-version">
          {versionLabel} {TERMS_VERSION} · {updatedLabel} {TERMS_UPDATED}
        </div>
      </div>
    </div>
  );
}

function Paragraphs({ body, muted }: { body: string; muted?: boolean }) {
  // Split on blank lines so each paragraph in the source string
  // renders as its own block, then promote consecutive "· "-prefixed
  // lines into a bulleted list.
  const paragraphs = body.split(/\n\s*\n/);
  return (
    <div
      className={`terms-body-text mt-3 space-y-3 leading-relaxed ${
        muted ? "text-brand-secondary/75" : "text-brand-secondary/85"
      }`}
    >
      {paragraphs.map((p, idx) => {
        const lines = p.split("\n");
        const bulletLines = lines.filter((l) => l.trim().startsWith("·"));
        if (bulletLines.length > 0 && bulletLines.length === lines.length) {
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
        return (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        );
      })}
    </div>
  );
}
