"use client";

import PageHero from "@/components/PageHero";
import Founders from "@/components/Founders";
import CTABanner from "@/components/CTABanner";
import { ShieldCheck, Heart, Sparkles, type LucideIcon } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

type ValueVisual = {
  icon: LucideIcon;
  bg: string;
  accentHex: string;
  iconRotate: number;
};

// Each value card matches the /vesijettimme feature-card hover model:
// 2 px brand-coloured inset ring on hover, lift, deeper shadow, icon
// rotate-and-scale. accentHex is fed into --feat-color (the ring
// colour) and iconRotate into --feat-rotate (the hover rotation).
const VALUE_VISUALS: ValueVisual[] = [
  {
    icon: ShieldCheck,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: 12,
  },
  {
    icon: Heart,
    bg: "bg-brand-turquoise",
    accentHex: "#1DD3B0",
    iconRotate: -10,
  },
  {
    icon: Sparkles,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: 8,
  },
];

export default function MeistaContent() {
  const t = useT();
  const page = t.pages.meista;
  const values = VALUE_VISUALS.map((v, i) => ({
    ...v,
    title: page.values[i].title,
    text: page.values[i].text,
  }));
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: page.title }]}
      />

      {/* Story stacked above the value cards: the previous side-by-side
          layout left the right column over-wide on lg, so the cards
          stretched into banner-shaped blocks with a lot of empty
          padding. Now the story leads at full width (capped to a
          comfortable reading column) and the three values sit below
          as a balanced 3-up grid that mirrors the /vesijettimme
          feature row. */}
      <section className="section">
        <div className="max-w-3xl">
          <span className="section-eyebrow">{page.storyEyebrow}</span>
          <h2 className="section-title">{page.storyTitle}</h2>
          <div className="mt-6 space-y-5 text-brand-secondary/80 leading-relaxed text-base sm:text-lg">
            <p>{page.storyBody1}</p>
            <p>{page.storyBody2}</p>
          </div>
        </div>

        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-4 md:gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="feature-card"
              style={
                {
                  "--feat-color": v.accentHex,
                  "--feat-rotate": `${v.iconRotate}deg`,
                } as React.CSSProperties
              }
            >
              <div
                className={`feat-icon h-11 w-11 rounded-xl ${v.bg} text-brand-secondary grid place-items-center`}
              >
                <v.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-brand-secondary mt-4 relative">
                {v.title}
              </h3>
              <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed relative">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Founders />

      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
