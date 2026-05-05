import type { Metadata } from "next";
import SopimusehdotContent from "./SopimusehdotContent";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Sopimusehdot",
  description:
    "82Rentals Oy:n vesijetin vuokrauksen yleiset sopimusehdot: varaus, peruutus, vakuutus, vastuut, lähtöpaikka.",
  path: "/sopimusehdot",
  ogTitle: "Sopimusehdot · 82Rentals",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Etusivu", path: "/" },
  { name: "Sopimusehdot", path: "/sopimusehdot" },
]);

export default function SopimusehdotPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <SopimusehdotContent />
    </>
  );
}
