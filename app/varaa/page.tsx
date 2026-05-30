import type { Metadata } from "next";
import VaraaContent from "./VaraaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Varaa vesijetti",
  description:
    "Varaa vesijetti Helsingissä 60 sekunnissa. Valitse päivä ja kesto, lähtö Tervasaaren satamasta keskustasta. Toimitus muualle puhelimitse ja lisämaksusta.",
  path: "/varaa",
  ogTitle: "Varaa vesijetti · 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Varaa", path: "/varaa" },
]);

/**
 * /varaa — varauslomake.
 *
 * Avajaisalennus (yliviivatut listahinnat, "Tarjous"-merkki,
 * "Avajaisalennus aktivoitu" -banneri) näytetään AINOASTAAN
 * silloin, kun asiakas on saapunut /alennus-sivun kautta. Sama
 * signaali ohjaa attribuution thewave-yhteistyökumppanille.
 *
 * Tunnistus tehdään client-puolella URL-parametrista (?ref=thewave,
 * joka tulee /alennus-sivun "Varaa nyt" -linkeistä) ja
 * sessionStoragesta. Cookie-pohjainen 30 päivän tunnistus on
 * poistettu kokonaan, jotta yksi /alennus-vierailu kuukausien
 * takana ei enää virheellisesti kirjaa myöhempää varausta thewaven
 * myynniksi.
 */
export default function VaraaPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <VaraaContent />
    </>
  );
}
