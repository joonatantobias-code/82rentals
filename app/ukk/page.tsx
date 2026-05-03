import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Usein kysytyt kysymykset",
  description:
    "Vastaukset yleisimpiin kysymyksiin: tarvitseeko ajokorttia, peruutusehdot, säävaraukset ja toimitusalueet.",
};

export default function UKKPage() {
  return (
    <>
      <PageHero
        eyebrow="UKK"
        title="Hyvät kysymykset, selkeät vastaukset."
        description="Jos jotain jäi mietityttämään, tästä löydät vastaukset. Etkö löydä omaasi? Laita viestiä."
        crumbs={[{ label: "UKK" }]}
      />
      <FAQ />
      <CTABanner
        title="Valmis lähtemään vesille?"
        subtitle="Varaa Sea-Doo Spark Trixx 60 sekunnissa ja saat sen toimitettuna Helsingissä minne tahansa."
      />
    </>
  );
}
