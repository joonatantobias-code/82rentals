"use client";

import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingModule from "@/components/BookingModule";
import {
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
