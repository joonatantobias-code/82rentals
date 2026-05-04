"use client";

import PageHero from "@/components/PageHero";
import Product from "@/components/Product";
import Anatomy from "@/components/Anatomy";
import CTABanner from "@/components/CTABanner";
import { useT } from "@/components/LocaleProvider";

export default function VesijettiContent() {
  const t = useT();
  const page = t.pages.vesijetti;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: t.nav.vesijetti }]}
      />
      <Product />
      <Anatomy />

      <section className="section-tinted">
        <div className="section relative">
          <div className="relative max-w-3xl mb-8">
            <span className="section-eyebrow">{page.specsEyebrow}</span>
            <h2 className="section-title">{page.specsTitle}</h2>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {page.specs.map((row) => (
              <div
                key={row.k}
                className="rounded-2xl bg-white p-5 border border-brand-primary/20 shadow-soft"
              >
                <dt className="text-xs uppercase tracking-wider text-brand-secondary/60 font-bold">
                  {row.k}
                </dt>
                <dd className="font-display text-xl sm:text-2xl font-extrabold text-brand-secondary mt-1">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABanner title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}
