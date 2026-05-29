"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { LOCAL_PHOTOS } from "@/lib/images";

/**
 * Referral-cookie configuration. The QR on the flyer carries
 * Caleb's attribution; landing here sets a 30-day cookie that the
 * marketing-site /api/book endpoint reads on submit and forwards
 * to the CRM as `sales_ref`. CRM resolves the username → user_id
 * and writes it onto bookings.sales_id, which feeds the existing
 * commission aggregates in /api/sales (+ Caleb's own dashboard).
 */
const REF_COOKIE = "b82_ref";
const REF_VALUE = "caleb";
const REF_TTL_DAYS = 30;

const TIERS = [
  { hours: "1 tunti", strike: "169 €", price: "119 €", saving: "−50 €" },
  {
    hours: "2 tuntia",
    strike: "259 €",
    price: "199 €",
    saving: "−60 €",
    popular: true,
  },
  { hours: "3 tuntia", strike: "319 €", price: "249 €", saving: "−70 €" },
];

const INCLUSIONS = [
  "Polttoaine",
  "Pelastusliivit",
  "Perehdytys",
  "Turvavarusteet",
];

export default function AlennusContent() {
  // Drop the referral cookie as soon as the page mounts. Path "/"
  // so it survives the navigation to /varaa; SameSite=Lax so the
  // POST /api/book on the same origin still sees it. We don't set
  // Secure here because the dev preview runs on http://localhost,
  // but production traffic is HTTPS-only anyway so the cookie
  // header still ends up flagged Secure by Vercel's edge.
  useEffect(() => {
    const expires = new Date(
      Date.now() + REF_TTL_DAYS * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `${REF_COOKIE}=${REF_VALUE}; expires=${expires}; path=/; SameSite=Lax`;
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-brand-secondary text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${LOCAL_PHOTOS.heroPoster})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-secondary/80 via-brand-secondary/65 to-brand-secondary"
      />

      <section className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        {/* Eyebrow + headline */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-2 text-xs sm:text-sm">
            <MapPin size={14} className="text-brand-primary" />
            Vesijetin vuokraus Helsinki
            <span className="opacity-50">·</span>
            <Star
              size={12}
              fill="#6EC6FF"
              strokeWidth={0}
              className="text-brand-primary"
            />
            4,9 / 5 · Google
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-[2.2rem] sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight mt-5"
          >
            Avajaisalennus on{" "}
            <span className="text-brand-primary">aktivoitu.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
          >
            Valitse alta sopiva paketti ja jatka varaukseen — alennus
            näkyy hinnoissa automaattisesti, ei koodia syötettävänä.
          </motion.p>
        </div>

        {/* Pricing tiles */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3 sm:gap-4">
          {TIERS.map((t) => (
            <div
              key={t.hours}
              className={`relative rounded-2xl p-5 sm:p-6 border ${
                t.popular
                  ? "bg-white/10 border-brand-primary/70"
                  : "bg-white/5 border-white/15"
              }`}
            >
              {t.popular && (
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 inline-flex items-center rounded-full bg-brand-primary text-brand-secondary px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] whitespace-nowrap">
                  ★ Suosituin
                </span>
              )}
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                {t.hours}
              </p>
              <p className="text-white/45 text-sm font-semibold line-through tabular-nums mt-3">
                {t.strike}
              </p>
              <p className="font-display font-black text-white text-4xl sm:text-5xl leading-none tracking-tighter mt-1 tabular-nums">
                {t.price}
              </p>
              <span className="mt-3 inline-flex items-center rounded-full bg-brand-orange/90 text-white text-[10px] font-extrabold uppercase tracking-[0.14em] px-2 py-0.5">
                {t.saving}
              </span>
            </div>
          ))}
        </div>

        {/* Inclusions */}
        <div className="mt-7 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 px-4 sm:px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary mb-2">
            Kaikkiin paketteihin sisältyy
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {INCLUSIONS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                <span className="grid place-items-center h-4 w-4 rounded-full bg-brand-primary/25 text-brand-primary shrink-0">
                  <Check size={11} strokeWidth={3.5} />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/varaa"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary text-brand-secondary font-bold px-7 py-3.5 text-sm uppercase tracking-[0.14em] hover:bg-white transition-colors min-h-[48px]"
          >
            Varaa nyt <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+358401866664"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 text-white px-6 py-3.5 text-sm hover:bg-white/10 transition-colors min-h-[48px]"
          >
            <Phone size={15} /> +358 40 186 6664
          </a>
        </div>

        {/* Pickup line */}
        <p className="mt-6 text-center text-white/65 text-xs sm:text-sm">
          Lähtö: <strong className="text-white">Tervasaaren satama</strong> ·
          Tervasaarenkannas 1, 00170 Helsinki
        </p>
      </section>
    </main>
  );
}
