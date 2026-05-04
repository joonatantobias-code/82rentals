import type { Metadata } from "next";
import HinnastoContent from "./HinnastoContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hinnasto",
  description:
    "Selkeä ja kaikki sisältyvä hinnoittelu. Toimitus aina hintaan kuuluen. Bensa 30 € tunnilta. 1h 119 €, 2h 199 €, 4h 349 €, 8h 599 €.",
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
      name: "1 tunnin vuokra",
      price: "119",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "2 tunnin vuokra",
      price: "199",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "Puoli päivää (4 h)",
      price: "349",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "Koko päivä (8 h)",
      price: "599",
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
