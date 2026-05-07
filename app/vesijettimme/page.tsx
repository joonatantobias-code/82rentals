import type { Metadata } from "next";
import VesijettiContent from "./VesijettiContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sea-Doo Spark Trixx 2up",
  description:
    "Sea-Doo Spark Trixx 2up on leikkisä, kahdelle ajajalle suunniteltu vesijetti. 90 hv Rotax, säädettävä ohjaustanko ja kevyt runko. Vuokraa Helsingissä alkaen 179 € / tunti, polttoaine sisältyy.",
  path: "/vesijettimme",
  ogTitle: "Sea-Doo Spark Trixx 2up · vesijetin vuokraus Helsingissä",
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
    lowPrice: "179",
    highPrice: "479",
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
