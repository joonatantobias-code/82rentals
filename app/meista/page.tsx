import type { Metadata } from "next";
import MeistaContent from "./MeistaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Meistä",
  description:
    "82Rentals on kolmen helsinkiläisen kaverin perustama vesijettivuokraus. Tutustu tiimiin ja tarinaan.",
  path: "/meista",
  ogTitle: "Meistä · 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Meistä", path: "/meista" },
]);

export default function MeistaPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <MeistaContent />
    </>
  );
}
