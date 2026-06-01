import type { Metadata } from "next";
import EvasteetContent from "./EvasteetContent";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Evästekäytäntö, 82Rentals",
  description:
    "Mitä evästeitä sivustomme käyttää, mihin niitä tarvitaan ja miten voit hallita niitä selaimessasi.",
  path: "/evasteet",
  ogTitle: "Evästekäytäntö, 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Evästekäytäntö", path: "/evasteet" },
]);

export default function EvasteetPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <EvasteetContent />
    </>
  );
}
