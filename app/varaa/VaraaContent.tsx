"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import BookingModule from "@/components/BookingModule";
import {
  BadgeCheck,
  Megaphone,
  Shield,
  Truck,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/components/LocaleProvider";

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

export default function VaraaContent({
  discountActive = false,
}: {
  discountActive?: boolean;
}) {
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

      {discountActive && <DiscountBanner />}

      <Suspense fallback={null}>
        <BookingModule />
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
 * Visible only when the b82_ref cookie is set on the request, so
 * the customer who scanned the flyer QR sees an unambiguous "your
 * discount is in" cue above the booking module, plus the reminder
 * to say the magic word at pickup so Caleb's attribution gets
 * confirmed face-to-face too.
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

          <div className="hidden lg:block self-stretch w-px bg-brand-secondary/10" />

          <div className="flex items-start gap-3 lg:max-w-xs">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-brand-orange/15 text-brand-orange shrink-0">
              <Megaphone size={16} />
            </span>
            <p className="text-xs leading-relaxed text-brand-secondary/80">
              <strong className="text-brand-secondary">
                Mainitse avajaisalennus
              </strong>{" "}
              luovutuksessa. Kuittaamme alennuksen myös paikan päällä.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
