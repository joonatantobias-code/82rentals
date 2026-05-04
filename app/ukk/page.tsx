import type { Metadata } from "next";
import UkkContent from "./UkkContent";

export const metadata: Metadata = {
  title: "Usein kysytyt kysymykset",
  description:
    "Vastaukset yleisimpiin kysymyksiin: tarvitseeko ajokorttia, peruutusehdot, säävaraukset ja toimitusalueet.",
};

export default function UKKPage() {
  return <UkkContent />;
}
