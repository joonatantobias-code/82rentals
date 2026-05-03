"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Users, Mail, Phone } from "lucide-react";

const tiers = [
  {
    name: "Pikamenoa",
    duration: "1 tunti",
    price: 119,
    fuelHours: 1,
    description: "Täydellinen ensikosketus saaristoon.",
    features: [
      "1 vesijetti, 2 hengelle",
      "Maksuton toimitus Helsingissä",
      "Pelastusliivit",
      "Lyhyt turvaopastus",
    ],
    highlight: false,
  },
  {
    name: "Suosikkikesto",
    duration: "2 tuntia",
    price: 199,
    fuelHours: 2,
    description: "Riittävän pitkä kunnon seikkailuun.",
    features: [
      "1 vesijetti, 2 hengelle",
      "Maksuton toimitus Helsingissä",
      "Pelastusliivit",
      "Reittisuositukset",
      "Ammattilaisvinkit tempuille",
    ],
    highlight: true,
  },
  {
    name: "Puoli päivää",
    duration: "4 tuntia",
    price: 349,
    fuelHours: 4,
    description: "Suomenlinna, Vallisaari ja saunatauko väliin.",
    features: [
      "1 vesijetti, 2 hengelle",
      "Maksuton toimitus Helsingissä",
      "Pelastusliivit",
      "Räätälöity reittisuunnittelu",
      "Etusija säävaraukseen",
    ],
    highlight: false,
  },
  {
    name: "Koko päivä",
    duration: "8 tuntia",
    price: 599,
    fuelHours: 8,
    description: "Aamusta iltaan vesillä, oma kapteenisi vain sinä.",
    features: [
      "1 vesijetti, 2 hengelle",
      "Maksuton toimitus Helsingissä",
      "Pelastusliivit",
      "Räätälöity reittisuunnittelu",
      "Etusija säävaraukseen",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section relative">
      <div className="blob-turquoise w-[260px] h-[260px] -top-10 right-0" />
      <div className="blob-primary w-[220px] h-[220px] -bottom-10 -left-20" />

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 md:pt-6">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative rounded-2xl p-6 md:p-7 transition-all ${
              tier.highlight
                ? "bg-brand-secondary text-white shadow-soft ring-2 ring-brand-primary md:-translate-y-3"
                : "bg-white text-brand-secondary border border-black/5 shadow-soft hover:-translate-y-1"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-secondary shadow-soft whitespace-nowrap">
                Suosituin
              </span>
            )}

            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold">{tier.name}</h3>
              <span
                className={`font-display font-extrabold text-2xl leading-none tracking-tight ${
                  tier.highlight ? "text-brand-secondary-700" : "text-brand-secondary/15"
                }`}
                aria-hidden
              >
                82
              </span>
            </div>
            <p
              className={`text-sm mt-1.5 ${
                tier.highlight ? "text-white/80" : "text-brand-secondary/65"
              }`}
            >
              {tier.duration} · {tier.description}
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
                  / vesijetti
                </span>
              </div>
              <p
                className={`text-xs mt-1.5 ${
                  tier.highlight ? "text-white/70" : "text-brand-secondary/60"
                }`}
              >
                + bensa {30 * tier.fuelHours} € (30 € / tunti)
              </p>
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
                  : "bg-brand-secondary text-white hover:bg-brand-primary hover:text-brand-secondary"
              }`}
            >
              Varaa {tier.duration}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two-up emphasis + custom packages contact note */}
      <div className="relative mt-10 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-brand-primary-50 border-2 border-brand-primary/40 p-6 flex items-start gap-4">
          <span className="h-12 w-12 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center shrink-0">
            <Users size={22} />
          </span>
          <div>
            <h4 className="font-display font-bold text-brand-secondary">
              Yhdellä vesijetillä matkustaa kaksi
            </h4>
            <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
              Sinä ja kaveri, kumppani tai sisarus, samalla pelillä. Ei tarvitse
              varata kahta jos olette kaksin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-secondary text-white p-6 flex items-start gap-4 relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-25 pointer-events-none" />
          <span className="relative h-12 w-12 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center shrink-0">
            <Mail size={22} />
          </span>
          <div className="relative">
            <h4 className="font-display font-bold">
              Eri pituiset paketit ja ryhmävaraukset
            </h4>
            <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
              Räätälöimme paketin pidemmistä ajoista, polttariporukoista ja
              tapahtumista. Soita{" "}
              <a
                href="tel:+358401866664"
                className="underline decoration-brand-primary/60 underline-offset-2 hover:text-brand-primary inline-flex items-center gap-1"
              >
                <Phone size={12} />
                +358 40 186 6664
              </a>{" "}
              tai{" "}
              <a
                href="mailto:82rentals.info@gmail.com"
                className="underline decoration-brand-primary/60 underline-offset-2 hover:text-brand-primary inline-flex items-center gap-1"
              >
                <Mail size={12} />
                82rentals.info@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
