"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { terms, COMPANY } from "@/lib/terms";

/**
 * /sopimusehdot page renderer.
 *
 * Web view: paginated like a PDF. The full document is split into
 * a cover + one page per top-level section + one page per appendix.
 * The customer flips through with prev/next arrows (or arrow keys).
 * Each "page" is rendered inside a portrait A-paper container with
 * the same chrome the print stylesheet will produce: a thin
 * navy-and-white header band carrying the black 82Rentals logo on
 * the left and the "82Rentals Oy" wordmark on the right, plus a
 * page counter at the bottom.
 *
 * Print view: hides the page navigator and prints every page in
 * order, letting the @page rules in globals.css handle real
 * pagination (margins, page-numbering footer, brand chrome). The
 * customer sees the same layout in their browser preview that they
 * get in the saved PDF.
 */
type Section = { id: string; heading: string; body: string };
type Page = { kind: "cover" } | { kind: "section"; section: Section };

export default function TermsView() {
  const { locale } = useLocale();
  const t = terms[locale === "en" ? "en" : "fi"];
  const isEn = locale === "en";
  const printLabel = isEn ? "Lataa PDF / tulosta" : "Lataa PDF / tulosta";
  const pageLabel = isEn ? "Page" : "Sivu";
  const prevLabel = isEn ? "Previous" : "Edellinen";
  const nextLabel = isEn ? "Next" : "Seuraava";

  const pages: Page[] = [
    { kind: "cover" },
    ...t.sections.map((s) => ({ kind: "section" as const, section: s })),
    ...t.appendices.map((a) => ({ kind: "section" as const, section: a })),
  ];
  const [pageIdx, setPageIdx] = useState(0);

  // Keyboard nav: left/right arrows step pages (skipping when an
  // input/textarea has focus so /sopimusehdot doesn't fight other
  // pages that share the layout).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key === "ArrowLeft") {
        setPageIdx((p) => Math.max(0, p - 1));
      } else if (e.key === "ArrowRight") {
        setPageIdx((p) => Math.min(pages.length - 1, p + 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  const current = pages[pageIdx];
  const totalPages = pages.length;

  return (
    <div className="terms-print">
      {/* ============================================================
       *  Top toolbar — print button + heading lockup. Hidden in
       *  print so it doesn't end up on the PDF.
       *  ============================================================ */}
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

      {/* ============================================================
       *  WEB-ONLY paginated viewer. Shows one page at a time inside
       *  the paper-like frame.
       *  ============================================================ */}
      <div className="not-print">
        <PageFrame
          isCover={current.kind === "cover"}
          pageNumber={pageIdx + 1}
          totalPages={totalPages}
        >
          {current.kind === "cover" ? (
            <CoverContent t={t} isEn={isEn} />
          ) : (
            <SectionContent section={current.section} />
          )}
        </PageFrame>

        {/* Page navigator */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
            disabled={pageIdx === 0}
            aria-label={prevLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-secondary text-white shadow-soft transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-brand-secondary disabled:hover:text-white disabled:hover:ring-0"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-sm font-bold tracking-wider text-brand-secondary/80">
            {pageLabel} {pageIdx + 1} / {totalPages}
          </div>

          <button
            type="button"
            onClick={() =>
              setPageIdx((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={pageIdx === totalPages - 1}
            aria-label={nextLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-secondary text-white shadow-soft transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-brand-secondary disabled:hover:text-white disabled:hover:ring-0"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ============================================================
       *  PRINT-ONLY: every page rendered in order, let @page handle
       *  pagination. The fixed brand header from globals.css repeats
       *  at the top of every printed page.
       *  ============================================================ */}
      <div className="print-only terms-pdf-pages">
        {/* Cover page (page 1) */}
        <div className="terms-pdf-page">
          <PrintHeader />
          <div className="terms-pdf-page-body">
            <CoverContent t={t} isEn={isEn} forPrint />
          </div>
        </div>

        {/* Section pages */}
        {t.sections.map((s) => (
          <div key={s.id} className="terms-pdf-page">
            <PrintHeader />
            <div className="terms-pdf-page-body">
              <SectionContent section={s} />
            </div>
          </div>
        ))}

        {/* Appendix pages */}
        {t.appendices.map((a) => (
          <div key={a.id} className="terms-pdf-page terms-pdf-appendix">
            <PrintHeader />
            <div className="terms-pdf-page-body">
              <SectionContent section={a} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 *  Page frame — the paper-like container shown on the web. Replicates
 *  the print layout (logo top-left, "82Rentals Oy" top-right,
 *  Sivu X / Y at the bottom) so what the customer sees in the
 *  browser is what they get in the saved PDF.
 * ============================================================================ */
function PageFrame({
  children,
  isCover,
  pageNumber,
  totalPages,
}: {
  children: React.ReactNode;
  isCover: boolean;
  pageNumber: number;
  totalPages: number;
}) {
  return (
    <div className="terms-page-frame">
      <div className="terms-page-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="82Rentals"
          className="terms-page-logo"
        />
        <div className="terms-page-company">82Rentals Oy</div>
      </div>

      <div
        className={`terms-page-body ${isCover ? "terms-page-body-cover" : ""}`}
      >
        {children}
      </div>

      <div className="terms-page-foot">
        Sivu {pageNumber} / {totalPages}
      </div>
    </div>
  );
}

/** Print-only header (matches the on-screen `terms-page-head`). The
 *  fixed @page header in globals.css handles repeating on every
 *  page; this inline element ensures the FIRST page also has the
 *  visual band even in browsers that don't honour fixed positioning
 *  during print. */
function PrintHeader() {
  return (
    <div className="terms-page-head">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="82Rentals"
        className="terms-page-logo"
      />
      <div className="terms-page-company">82Rentals Oy</div>
    </div>
  );
}

function CoverContent({
  t,
  isEn,
  forPrint,
}: {
  t: typeof terms.fi;
  isEn: boolean;
  forPrint?: boolean;
}) {
  return (
    <div
      className={`terms-cover ${forPrint ? "terms-cover-print" : ""}`}
    >
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
  );
}

function SectionContent({ section }: { section: Section }) {
  return (
    <section className="terms-section">
      <h3 className="terms-heading">{section.heading}</h3>
      <Paragraphs body={section.body} />
    </section>
  );
}

function Paragraphs({ body }: { body: string }) {
  // Split on blank lines so each paragraph in the source string
  // renders as its own block, then promote consecutive "· "-prefixed
  // lines into a bulleted list.
  const paragraphs = body.split(/\n\s*\n/);
  return (
    <div className="terms-body-text mt-3 space-y-3 leading-relaxed">
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
