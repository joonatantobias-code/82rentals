import type { Metadata } from "next";
import VaraaContent from "./VaraaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Varaa vesijetti",
  description:
    "Varaa Sea-Doo Spark Trixx 60 sekunnissa. Valitse aika ja kesto. Lähtö Kipparlahden satamasta.",
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
