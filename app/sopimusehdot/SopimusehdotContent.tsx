"use client";

import PageHero from "@/components/PageHero";
import TermsView from "@/components/TermsView";
import { useLocale } from "@/components/LocaleProvider";

export default function SopimusehdotContent() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  return (
    <>
      <div className="not-print">
        <PageHero
          eyebrow={isEn ? "Terms" : "Ehdot"}
          title={isEn ? "Terms and conditions" : "Sopimusehdot"}
          description={
            isEn
              ? "Read these before confirming your booking. Applies to all new rentals. You can save the document as a PDF from the print button below."
              : "Lue ehdot läpi ennen varauksen vahvistamista. Voimassa kaikkiin uusiin varauksiin. Voit tallentaa asiakirjan PDF:nä alla olevasta tulostusnapista."
          }
          crumbs={[{ label: isEn ? "Terms" : "Sopimusehdot" }]}
        />
      </div>
      <section className="section terms-print-section">
        <div className="card-soft terms-print-card p-6 lg:p-10 max-w-3xl mx-auto">
          <TermsView />
        </div>
      </section>
    </>
  );
}
