"use client";

import PageHero from "@/components/PageHero";
import Founders from "@/components/Founders";
import CTABanner from "@/components/CTABanner";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

// Icons match the new "Ammattimaisuus / Asiakas ensin / Joustavuus"
// values: shield = professional rigour, heart = customer first,
// sparkles = flexibility / making it feel easy.
const VALUE_ICONS = [
  { icon: ShieldCheck, bg: "bg-brand-primary" },
  { icon: Heart, bg: "bg-brand-turquoise" },
  { icon: Sparkles, bg: "bg-brand-primary" },
];

export default function MeistaContent() {
  const t = useT();
  const page = t.pages.meista;
  const values = VALUE_ICONS.map((v, i) => ({
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

      <section className="section">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="section-eyebrow">{page.storyEyebrow}</span>
            <h2 className="section-title">{page.storyTitle}</h2>
            <div className="mt-6 space-y-5 text-brand-secondary/80 leading-relaxed text-base sm:text-lg">
              <p>{page.storyBody1}</p>
              <p>{page.storyBody2}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white border border-black/5 shadow-soft p-5 sm:p-6"
              >
                <div
                  className={`h-11 w-11 rounded-xl ${v.bg} text-brand-secondary grid place-items-center`}
                >
                  <v.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-brand-secondary mt-4">
                  {v.title}
                </h3>
                <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Founders />

      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
