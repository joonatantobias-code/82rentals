import type { Metadata } from "next";
import VesijettiContent from "./VesijettiContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Vesijettimme",
  description:
    "Tutustu vesijetteihimme — kaksipaikkainen, ketterä peli ensikertalaiselle ja kokeneelle ajajalle. Avajaistarjous alkaen 119 € / tunti, polttoaine ja pelastusliivit aina hintaan.",
  path: "/vesijettimme",
  ogTitle: "Vesijetin vuokraus Helsingissä · 82Rentals",
});

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/vesijettimme#product`,
  name: "Sea-Doo Spark Trixx 2up",
  category: "Personal watercraft rental",
  brand: { "@type": "Brand", name: "Sea-Doo" },
  description:
    "Sea-Doo Spark Trixx 2up. 90 hv Rotax, säädettävä ohjaustanko, kevyt 191 kg runko. Suunniteltu kahdelle ajajalle.",
  image: `${SITE_URL}/logo.png`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "119",
    highPrice: "279",
    offerCount: 3,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/varaa`,
    seller: { "@id": `${SITE_URL}/#business` },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "27",
    bestRating: "5",
  },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Vesijetti", path: "/vesijettimme" },
]);

export default function VesijettiPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbs} />
      <VesijettiContent />
    </>
  );
}
