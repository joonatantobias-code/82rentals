import type { Metadata } from "next";
import VaraaContent from "./VaraaContent";

export const metadata: Metadata = {
  title: "Varaa vesijetti",
  description:
    "Varaa Sea-Doo Spark Trixx 60 sekunnissa. Valitse aika, kesto ja toimituspaikka, me hoidamme loput.",
};

export default function VaraaPage() {
  return <VaraaContent />;
}
