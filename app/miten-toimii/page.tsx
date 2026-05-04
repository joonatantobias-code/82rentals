import type { Metadata } from "next";
import MitenToimiiContent from "./MitenToimiiContent";

export const metadata: Metadata = {
  title: "Näin se toimii",
  description:
    "Selauksesta vesille neljässä helpossa askeleessa: valitse aika, me toimitamme, aja minne tahansa, helppo palautus.",
};

export default function MitenToimiiPage() {
  return <MitenToimiiContent />;
}
