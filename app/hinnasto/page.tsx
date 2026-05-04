import type { Metadata } from "next";
import HinnastoContent from "./HinnastoContent";

export const metadata: Metadata = {
  title: "Hinnasto",
  description:
    "Selkeä ja kaikki sisältyvä hinnoittelu. Toimitus aina hintaan kuuluen. Bensa 30 € tunnilta.",
};

export default function HinnastoPage() {
  return <HinnastoContent />;
}
