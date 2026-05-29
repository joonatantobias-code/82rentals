import type { Metadata } from "next";
import { cookies } from "next/headers";
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

export default function VaraaPage() {
  // Read the b82_ref cookie set on /alennus. Presence tells the
  // page the customer arrived via the flyer QR; we surface that
  // as a green "alennus aktivoitu" banner above the booking
  // module so they don't have to wonder whether the discount took.
  const discountActive = Boolean(cookies().get("b82_ref")?.value);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <VaraaContent discountActive={discountActive} />
    </>
  );
}
