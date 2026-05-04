import type { Metadata } from "next";
import MeistaContent from "./MeistaContent";

export const metadata: Metadata = {
  title: "Meistä",
  description:
    "82Rentals on kolmen helsinkiläisen kaverin perustama vesijettivuokraus. Tutustu tiimiin ja tarinaan.",
};

export default function MeistaPage() {
  return <MeistaContent />;
}
