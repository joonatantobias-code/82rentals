import type { Metadata } from "next";
import Image from "next/image";

/**
 * Huoltotila-sivu. Renderöidään middlewaresta kaikille julkisille
 * reiteille kunnes huoltotila puretaan (poistetaan middleware.ts
 * tai asetetaan ympäristömuuttuja MAINTENANCE_OFF=1).
 *
 * Sivulla on tahallisen niukka sisältö: pelkkä "tilapäisesti
 * pois käytöstä" -ilmoitus + suora puhelin / sähköposti, jotta
 * varauksen kanssa kiireinen asiakas saa silti yhteyden tiimiin
 * eikä tulkitse 503-tyyppistä tyhjää sivua palvelun
 * lopettamiseksi.
 */
export const metadata: Metadata = {
  title: "Huoltotauko · 82Rentals",
  description: "Sivusto on tilapäisesti pois käytöstä. Palaamme pian.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-brand-secondary text-white px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto h-16 w-16 mb-8 relative">
          <Image
            src="/logo.png"
            alt="82Rentals"
            fill
            sizes="64px"
            className="object-contain"
            priority
          />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          Sivusto on tilapäisesti pois käytöstä.
        </h1>
        <p className="mt-4 text-white/80 leading-relaxed">
          Palaamme pian. Kiireellisissä asioissa voit olla
          yhteydessä suoraan asiakaspalveluun.
        </p>

        <div className="mt-8 space-y-2 text-sm">
          <a
            href="tel:+358401866664"
            className="block text-brand-primary font-semibold hover:underline"
          >
            +358 40 186 6664
          </a>
          <a
            href="mailto:asiakaspalvelu@82rentals.com"
            className="block text-brand-primary font-semibold hover:underline"
          >
            asiakaspalvelu@82rentals.com
          </a>
        </div>
      </div>
    </main>
  );
}
