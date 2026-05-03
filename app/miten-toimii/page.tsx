import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Näin se toimii",
  description:
    "Selauksesta vesille neljässä helpossa askeleessa: valitse aika, me toimitamme, aja minne tahansa, helppo palautus.",
};

export default function MitenToimiiPage() {
  return (
    <>
      <PageHero
        eyebrow="Prosessi"
        title="Näin se toimii."
        description="Sinun ei tarvitse omistaa perävaunua, etsiä parkkia tai jonottaa vuokraamossa. Me hoidamme logistiikan, sinä hoidat kaasukahvan."
        crumbs={[{ label: "Näin se toimii" }]}
      />
      <HowItWorks />
      <CTABanner
        title="Yhdellä klikkauksella vesille."
        subtitle="Varaa Sea-Doo Spark Trixx ja saat sen toimitettuna haluamaasi paikkaan."
      />
    </>
  );
}
