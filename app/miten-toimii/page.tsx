import type { Metadata } from "next";
import MitenToimiiContent from "./MitenToimiiContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Näin se toimii",
  description:
    "Selauksesta vesille neljässä helpossa askeleessa: valitse aika, me toimitamme, aja minne tahansa, helppo palautus.",
  path: "/miten-toimii",
  ogTitle: "Näin se toimii · 82Rentals",
});

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/miten-toimii#howto`,
  name: "Näin vuokraat vesijetin 82Rentalsilta",
  description:
    "Vuokraa vesijetti Helsingissä neljässä helpossa askeleessa.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Valitse aika ja kesto",
      text: "Valitse päivä ja vuokra-aika 1, 2, 4 tai 8 tuntia.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Valitse toimituspaikka",
      text: "Valitse haluamasi ranta tai laituri Helsingin alueella.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Välitön sähköpostivahvistus",
      text: "Saat vahvistuksen sähköpostiisi varauksen tehtyäsi. Aikasi on lukittu kalenteriin.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Aja vesille",
      text: "Tuomme jetin paikan päälle, käymme turvaopastuksen ja olet vesillä.",
    },
  ],
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Näin se toimii", path: "/miten-toimii" },
]);

export default function MitenToimiiPage() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbs} />
      <MitenToimiiContent />
    </>
  );
}
