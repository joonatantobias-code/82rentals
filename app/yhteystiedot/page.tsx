import type { Metadata } from "next";
import YhteystiedotContent from "./YhteystiedotContent";

export const metadata: Metadata = {
  title: "Yhteystiedot",
  description:
    "Ota yhteyttä 82Rentals. Soita, laita sähköpostia tai löydä meidät somesta.",
};

export default function YhteystiedotPage() {
  return <YhteystiedotContent />;
}
