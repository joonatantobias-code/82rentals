"use client";

import PageHero from "@/components/PageHero";
import TermsView from "@/components/TermsView";
import { useT } from "@/components/LocaleProvider";

export default function SopimusehdotContent() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow="Ehdot"
        title="Sopimusehdot"
        description="Lue läpi ennen varauksen vahvistamista. Voimassa kaikkiin uusiin varauksiin."
        crumbs={[{ label: "Sopimusehdot" }]}
      />
      <section className="section">
        <div className="card-soft p-6 lg:p-10 max-w-3xl mx-auto">
          <TermsView />
        </div>
      </section>
    </>
  );
}
