"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Users, Mail, Phone, Flame, Zap, Gem, Anchor } from "lucide-react";
import { useT } from "@/components/LocaleProvider";
import { BASE_PRICES, TIER_TAG, type Duration } from "@/lib/pricing";

const ORDER: Duration[] = ["1h", "2h", "halfday", "fullday"];

const TAG_ICON = {
  fast: Zap,
  popular: Flame,
  "best-value": Gem,
  premium: Anchor,
} as const;

export default function Pricing() {
  const t = useT();
  const tiers = ORDER.map((d, i) => ({
    duration: d,
    price: BASE_PRICES[d],
    tag: TIER_TAG[d],
    highlight: d === "2h",
    bestValue: d === "halfday",
    name: t.pricing.tiers[i].name,
    durationLabel: t.pricing.tiers[i].duration,
    description: t.pricing.tiers[i].description,
    features: t.pricing.tiers[i].features,
    tagLabel: t.pricing.tiers[i].tag,
    cta: t.pricing.tiers[i].cta,
  }));

  return (
    <section id="pricing" className="section relative">
      <div className="blob-turquoise w-[260px] h-[260px] -top-10 right-0" />
      <div className="blob-primary w-[220px] h-[220px] -bottom-10 -left-20" />

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 md:pt-6">
        {tiers.map((tier, i) => {
          const Icon = TAG_ICON[tier.tag];
          const showBadge = tier.highlight || tier.bestValue;
          return (
            <motion.div
              key={tier.duration}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative rounded-2xl p-6 md:p-7 transition-all ${
                tier.highlight
                  ? "bg-brand-secondary text-white shadow-soft ring-2 ring-brand-primary md:-translate-y-3"
                  : tier.bestValue
                    ? "bg-white text-brand-secondary border-2 border-brand-turquoise shadow-soft hover:-translate-y-1"
                    : "bg-white text-brand-secondary border border-black/5 shadow-soft hover:-translate-y-1"
              }`}
            >
              {showBadge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-soft whitespace-nowrap ${
                    tier.highlight
                      ? "bg-brand-primary text-brand-secondary"
                      : "bg-brand-turquoise text-brand-secondary"
                  }`}
                >
                  {tier.highlight ? t.pricing.mostPopular : tier.tagLabel}
                </span>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={`h-7 w-7 rounded-full grid place-items-center shrink-0 ${
                    tier.highlight
                      ? "bg-brand-primary text-brand-secondary"
                      : "bg-brand-primary-50 text-brand-secondary"
                  }`}
                >
                  <Icon size={14} strokeWidth={2.5} />
                </span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                    tier.highlight ? "text-brand-primary" : "text-brand-secondary/60"
                  }`}
                >
                  {tier.tagLabel}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold mt-3">{tier.name}</h3>
              <p
                className={`text-sm mt-1.5 ${
                  tier.highlight ? "text-white/80" : "text-brand-secondary/65"
                }`}
              >
                {tier.durationLabel} · {tier.description}
              </p>

              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl md:text-5xl font-extrabold">
                    {tier.price} €
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlight ? "text-white/70" : "text-brand-secondary/60"
                    }`}
                  >
                    {t.common.perJet}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-0.5 h-5 w-5 rounded-full grid place-items-center shrink-0 ${
                        tier.highlight
                          ? "bg-brand-primary text-brand-secondary"
                          : "bg-brand-primary-50 text-brand-secondary"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/varaa"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all min-h-[48px] ${
                  tier.highlight
                    ? "bg-brand-primary text-brand-secondary hover:bg-white"
                    : tier.bestValue
                      ? "bg-brand-turquoise text-brand-secondary hover:brightness-95"
                      : "bg-brand-secondary text-white hover:bg-brand-primary hover:text-brand-secondary"
                }`}
              >
                {tier.cta}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="relative mt-8 rounded-2xl bg-brand-primary-50 border-2 border-brand-primary/30 p-5 md:p-6 text-center">
        <h4 className="font-display font-bold text-brand-secondary text-lg">
          {t.pricing.allInclusiveTitle}
        </h4>
        <p className="text-sm md:text-base text-brand-secondary/75 mt-1.5 max-w-2xl mx-auto leading-relaxed">
          {t.pricing.allInclusiveBody}
        </p>
      </div>

      <div className="relative mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-brand-primary-50 border-2 border-brand-primary/40 p-6 flex items-start gap-4">
          <span className="h-12 w-12 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center shrink-0">
            <Users size={22} />
          </span>
          <div>
            <h4 className="font-display font-bold text-brand-secondary">
              {t.pricing.twoUpTitle}
            </h4>
            <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
              {t.pricing.twoUpBody}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-secondary text-white p-6 flex items-start gap-4 relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-25 pointer-events-none" />
          <span className="relative h-12 w-12 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center shrink-0">
            <Mail size={22} />
          </span>
          <div className="relative">
            <h4 className="font-display font-bold">{t.pricing.customTitle}</h4>
            <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
              {t.pricing.customBody}
              <br />
              <a
                href="tel:+358401866664"
                className="underline decoration-brand-primary/60 underline-offset-2 hover:text-brand-primary inline-flex items-center gap-1 mt-1"
              >
                <Phone size={12} />
                +358 40 186 6664
              </a>
              {" "}·{" "}
              <a
                href="mailto:82rentals.info@gmail.com"
                className="underline decoration-brand-primary/60 underline-offset-2 hover:text-brand-primary inline-flex items-center gap-1"
              >
                <Mail size={12} />
                82rentals.info@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
