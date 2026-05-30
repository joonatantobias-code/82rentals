"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import BookingModule from "@/components/BookingModule";
import {
  BadgeCheck,
  Shield,
  Truck,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/components/LocaleProvider";

/**
 * Yhteistyökumppanin tunniste, jota /alennus-sivu välittää
 * /varaa-linkissä `?ref=thewave`. Vain tämä tarkka arvo voi
 * aktivoida alennusbannerin + näyttää yliviivatut listahinnat +
 * kirjata varauksen thewaven myynniksi. Random / muokatut
 * arvot eivät pure: client lähettää sales_refin vain jos
 * tunniste matchaa.
 */
const PARTNER_REF = "thewave";
const SESSION_KEY = "b82_alennus";

type ReassuranceVisual = {
  icon: LucideIcon;
  bg: string;
  accentHex: string;
  iconRotate: number;
};

// Each reassurance card now uses the shared `feature-card` hover model
// (same as /vesijettimme features and /meista values): a 2 px brand-
// coloured inset ring on hover, lift, deeper shadow, and an icon
// rotate-and-scale. accentHex feeds --feat-color (the ring colour),
// iconRotate feeds --feat-rotate (the hover rotation).
const REASSURANCE_VISUALS: ReassuranceVisual[] = [
  {
    icon: Shield,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: 12,
  },
  {
    icon: Truck,
    bg: "bg-brand-turquoise",
    accentHex: "#1DD3B0",
    iconRotate: -10,
  },
  {
    icon: Clock,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: 8,
  },
  {
    icon: Users,
    bg: "bg-brand-secondary",
    accentHex: "#0A3D62",
    iconRotate: -8,
  },
];

export default function VaraaContent() {
  const t = useT();
  const page = t.pages.varaa;
  const reassurances = REASSURANCE_VISUALS.map((v, i) => ({
    ...v,
    title: page.reassurances[i].title,
    text: page.reassurances[i].text,
  }));
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: t.footer.varaaLink }]}
      />

      <Suspense fallback={null}>
        <BookingGate />
      </Suspense>

      <section className="section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reassurances.map((r) => (
            <div
              key={r.title}
              className="feature-card"
              style={
                {
                  "--feat-color": r.accentHex,
                  "--feat-rotate": `${r.iconRotate}deg`,
                } as React.CSSProperties
              }
            >
              <div
                className={`feat-icon h-11 w-11 rounded-xl ${r.bg} ${
                  r.bg === "bg-brand-secondary"
                    ? "text-white"
                    : "text-brand-secondary"
                } grid place-items-center`}
              >
                <r.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-brand-secondary mt-4 relative">
                {r.title}
              </h3>
              <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed relative">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/**
 * Lukee URL-parametrin (?ref=thewave) JA sessionStoragen, päättää
 * onko avajaisalennus aktivoitu tälle vierailulle, ja renderöi
 * banner + BookingModule oikealla discountActive-asetuksella.
 *
 * URL-parametri on ensisijainen lähde: se on /alennus-sivun
 * "Varaa nyt" -linkin payload. SessionStorage on fallback samassa
 * tabissa, jos käyttäjä navigoi /varaa-osoitteeseen jonkin muun
 * sisäisen linkin kautta saavuttuaan ensin /alennus-sivulle.
 */
function BookingGate() {
  const searchParams = useSearchParams();
  const [partnerRef, setPartnerRef] = useState<string | null>(null);

  useEffect(() => {
    let ref: string | null = null;
    const fromQuery = searchParams?.get("ref") ?? null;
    if (fromQuery === PARTNER_REF) {
      ref = PARTNER_REF;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* noop */
      }
    } else {
      try {
        const flag = window.sessionStorage.getItem(SESSION_KEY);
        if (flag === "1") ref = PARTNER_REF;
      } catch {
        /* noop */
      }
    }
    setPartnerRef(ref);
  }, [searchParams]);

  return (
    <>
      {partnerRef && <DiscountBanner />}
      <BookingModule
        discountActive={Boolean(partnerRef)}
        partnerRef={partnerRef}
      />
    </>
  );
}

/**
 * Avajaisalennus-banneri. Näkyy /varaa-sivulla vain niille
 * vierailijoille, jotka saapuivat /alennus-sivun kautta (joko
 * QR-koodi-skannauksena tai jaetusta linkistä, jossa on
 * ?ref=thewave).
 */
function DiscountBanner() {
  return (
    <section className="section pt-6 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-500/12 via-emerald-400/10 to-emerald-300/5 p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="relative grid place-items-center h-12 w-12 rounded-xl bg-emerald-400 text-white shrink-0">
            <span className="absolute inset-0 rounded-xl bg-emerald-300/50 animate-ping" />
            <BadgeCheck size={22} className="relative" />
          </span>

          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Avajaisalennus aktivoitu
            </p>
            <p className="font-display font-extrabold text-brand-secondary text-lg sm:text-xl leading-tight mt-1">
              Alennetut hinnat näkyvät automaattisesti.
            </p>
            <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
              1 h <strong>119 €</strong> · 2 h <strong>199 €</strong> · 3 h{" "}
              <strong>249 €</strong>. Säästät jopa 70 €. Alennus näkyy
              suoraan kassayhteenvedossa.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
