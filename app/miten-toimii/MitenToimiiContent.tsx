"use client";

import { motion } from "framer-motion";
import { Clock, Backpack, IdCard, CreditCard, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";
import { useT } from "@/components/LocaleProvider";

type PrepVisual = {
  icon: LucideIcon;
  bg: string;
  accentHex: string;
  iconRotate: number;
};

const PREP_VISUALS: PrepVisual[] = [
  {
    icon: Clock,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: 12,
  },
  {
    icon: Backpack,
    bg: "bg-brand-turquoise",
    accentHex: "#1DD3B0",
    iconRotate: -10,
  },
  {
    icon: IdCard,
    bg: "bg-brand-secondary",
    accentHex: "#0A3D62",
    iconRotate: 8,
  },
  {
    icon: CreditCard,
    bg: "bg-brand-primary",
    accentHex: "#6EC6FF",
    iconRotate: -8,
  },
];

export default function MitenToimiiContent() {
  const t = useT();
  const page = t.pages["miten-toimii"];
  const prep = PREP_VISUALS.map((v, i) => ({
    ...v,
    title: page.prepItems[i].title,
    text: page.prepItems[i].text,
  }));
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: page.title }]}
      />
      <HowItWorks />

      {/* "Mitä seuraavaksi" preparation checklist. Mirrors the same
          four items the customer confirmation email lists, so what
          shows up on the site and what lands in their inbox is the
          single source of truth. */}
      <section className="section">
        <div className="relative max-w-3xl mb-10 md:mb-12">
          <span className="section-eyebrow">{page.prepEyebrow}</span>
          <h2 className="section-title">{page.prepTitle}</h2>
          <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
            {page.prepBody}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {prep.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="feature-card"
              style={
                {
                  "--feat-color": p.accentHex,
                  "--feat-rotate": `${p.iconRotate}deg`,
                } as React.CSSProperties
              }
            >
              <div
                className={`feat-icon h-11 w-11 rounded-xl ${p.bg} ${
                  p.bg === "bg-brand-secondary"
                    ? "text-white"
                    : "text-brand-secondary"
                } grid place-items-center`}
              >
                <p.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-brand-secondary mt-4 relative">
                {p.title}
              </h3>
              <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed relative">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
