"use client";

import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import CTABanner from "@/components/CTABanner";
import { useT } from "@/components/LocaleProvider";

export default function HinnastoContent() {
  const t = useT();
  const page = t.pages.hinnasto;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: t.nav.hinnasto }]}
      />
      <Pricing />
      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
