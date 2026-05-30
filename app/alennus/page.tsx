import type { Metadata } from "next";
import AlennusContent from "./AlennusContent";

/**
 * /alennus, flyer-koodin landing page.
 *
 * QR-koodi viittaa tähän reittiin (https://82rentals.com/alennus).
 * Sivulla on alennustarjous + CTA varaa-sivulle. Cookie-set
 * tapahtuu client-komponentissa: kun käyttäjä lataa sivun, hänen
 * selaimeensa kirjautuu 30 päivän referral-cookie joka sitoo
 * seuraavan varauksen tähän myyjään (Caleb).
 */
export const metadata: Metadata = {
  title: "Avajaisalennus, vesijetin vuokraus Helsinki",
  description:
    "Avajaisalennus aktivoituu automaattisesti. 1 h 119 €, 2 h 199 €, 3 h 249 €. Polttoaine, pelastusliivit ja perehdytys aina hintaan. Lähtö Tervasaaren satamasta.",
  alternates: { canonical: "https://82rentals.com/alennus" },
  robots: { index: false, follow: true },
};

export default function AlennusPage() {
  return <AlennusContent />;
}
