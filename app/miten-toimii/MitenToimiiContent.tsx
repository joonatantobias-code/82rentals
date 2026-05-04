"use client";

import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";
import { useT } from "@/components/LocaleProvider";

export default function MitenToimiiContent() {
  const t = useT();
  const page = t.pages["miten-toimii"];
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: page.title }]}
      />
      <HowItWorks />
      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
