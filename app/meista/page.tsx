import type { Metadata } from "next";
import MeistaContent from "./MeistaContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

// Intentionally avoids the "vesijettivuokraus Helsinki" phrase so
// the about page doesn't compete with the homepage for the brand /
// service search. /meista is a team-and-story page; the homepage
// is the page that should rank for the rental query.
export const metadata: Metadata = buildPageMetadata({
  title: "Tiimi ja tarina",
  description:
    "Kolmen helsinkiläisen ystävän tarina 82Rentalsin takana. Tutustu tiimiin ja syihin, miksi rakensimme tämän.",
  path: "/meista",
  ogTitle: "Tiimi ja tarina · 82Rentals",
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
