import type { Metadata } from "next";
import VesijettiContent from "./VesijettiContent";

export const metadata: Metadata = {
  title: "Sea-Doo Spark Trixx 2up",
  description:
    "Sea-Doo Spark Trixx 2up on leikkisä, kahdelle ajajalle suunniteltu vesijetti. 90 hv Rotax, säädettävä ohjaustanko ja kevyt runko.",
};

export default function VesijettiPage() {
  return <VesijettiContent />;
}
