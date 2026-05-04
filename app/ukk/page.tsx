import type { Metadata } from "next";
import UkkContent from "./UkkContent";
import JsonLd from "@/components/JsonLd";
import { dictionary } from "@/lib/i18n/dictionary";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Usein kysytyt kysymykset",
  description:
    "Vastaukset yleisimpiin kysymyksiin: tarvitseeko ajokorttia, peruutusehdot, säävaraukset ja toimitusalueet.",
  path: "/ukk",
  ogTitle: "Usein kysytyt kysymykset · 82Rentals",
});

const faqItems = dictionary.fi.pages.ukk.items;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Usein kysytyt kysymykset", path: "/ukk" },
]);

export default function UKKPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbs} />
      <UkkContent />
    </>
  );
}
