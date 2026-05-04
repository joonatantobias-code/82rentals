"use client";

import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { useT } from "@/components/LocaleProvider";

export default function UkkContent() {
  const t = useT();
  const page = t.pages.ukk;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: page.eyebrow }]}
      />
      <FAQ />
      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
