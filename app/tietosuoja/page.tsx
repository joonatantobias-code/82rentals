import type { Metadata } from "next";
import TietosuojaContent from "./TietosuojaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tietosuojaseloste, 82Rentals",
  description:
    "Miten käsittelemme henkilötietojasi varauksen yhteydessä, mihin niitä käytetään, miten kauan säilytämme ja mitä oikeuksia sinulla on. GDPR-yhteensopiva tietosuojaseloste.",
  path: "/tietosuoja",
  ogTitle: "Tietosuojaseloste, 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Tietosuojaseloste", path: "/tietosuoja" },
]);

export default function TietosuojaPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <TietosuojaContent />
    </>
  );
}
