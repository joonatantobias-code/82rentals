import type { Metadata } from "next";
import YhteystiedotContent from "./YhteystiedotContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Yhteystiedot",
  description:
    "Ota yhteyttä 82Rentals. Soita +358 40 186 6664, laita sähköpostia 82rentals.info@gmail.com tai löydä meidät somesta.",
  path: "/yhteystiedot",
  ogTitle: "Yhteystiedot · 82Rentals",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/yhteystiedot#contact`,
  url: `${SITE_URL}/yhteystiedot`,
  name: "82Rentals · Yhteystiedot",
  about: { "@id": `${SITE_URL}/#business` },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Yhteystiedot", path: "/yhteystiedot" },
]);

export default function YhteystiedotPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <JsonLd data={breadcrumbs} />
      <YhteystiedotContent />
    </>
  );
}
