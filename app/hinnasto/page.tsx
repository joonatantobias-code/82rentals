import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Hinnasto",
  description:
    "Selkeä ja kaikki sisältyvä hinnoittelu. Toimitus aina hintaan kuuluen. Bensa 30 € tunnilta.",
};

export default function HinnastoPage() {
  return (
    <>
      <PageHero
        eyebrow="Hinnasto"
        title="Selkeä, kaikki sisältyy."
        description="Toimitus, pelastusliivit ja vakuutus kuuluvat aina hintaan. Bensaveloitus 30 € jokaiselta tunnilta."
        crumbs={[{ label: "Hinnasto" }]}
      />
      <Pricing />
      <CTABanner
        title="Lukitse hintasi nyt."
        subtitle="Hinnat ovat kiinteät, varaa heti, niin saat parhaat ajat itsellesi."
      />
    </>
  );
}
