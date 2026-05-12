import type { Metadata } from "next";
import VaraaContent from "./VaraaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Varaa vesijetti",
  description:
    "Varaa vesijetti Helsingissä 60 sekunnissa. Valitse päivä ja kesto, lähtö Kipparlahden satamasta tai ilmainen toimitus pääkaupunkiseudulle.",
  path: "/varaa",
  ogTitle: "Varaa vesijetti · 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Varaa", path: "/varaa" },
]);

export default function VaraaPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <VaraaContent />
    </>
  );
}
