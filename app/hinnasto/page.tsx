import type { Metadata } from "next";
import HinnastoContent from "./HinnastoContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hinnasto",
  description:
    "Selkeä ja kaikki sisältyvä hinnoittelu. Polttoaine, toimitus ja vakuutus aina hintaan. 1h 179 €, 2h 279 €, 4h 479 €, 8h 879 €.",
  path: "/hinnasto",
  ogTitle: "Hinnasto · 82Rentals",
});

const offerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/hinnasto#offers`,
  name: "82Rentals hinnasto",
  itemListElement: [
    {
      "@type": "Offer",
      name: "1 tunnin vuokra (polttoaine sisältyy)",
      price: "179",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "2 tunnin vuokra (polttoaine sisältyy)",
      price: "279",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "Puoli päivää, 4 h (polttoaine sisältyy)",
      price: "479",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "Koko päivä, 8 h (polttoaine sisältyy)",
      price: "879",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
  ],
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Hinnasto", path: "/hinnasto" },
]);

export default function HinnastoPage() {
  return (
    <>
      <JsonLd data={offerCatalogJsonLd} />
      <JsonLd data={breadcrumbs} />
      <HinnastoContent />
    </>
  );
}
