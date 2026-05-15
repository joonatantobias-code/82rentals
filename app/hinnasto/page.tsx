import type { Metadata } from "next";
import HinnastoContent from "./HinnastoContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hinnasto",
  description:
    "Selkeä ja kaikki sisältyvä hinnoittelu. Polttoaine, toimitus ja vakuutus aina hintaan. Avajaistarjous: 1h 100 €, 2h 169 €, 3h 238 €.",
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
      price: "100",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "2 tunnin vuokra (polttoaine sisältyy)",
      price: "169",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "3 tunnin vuokra (polttoaine sisältyy)",
      price: "238",
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
