"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  Megaphone,
  Phone,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

/**
 * Referral cookie. Set on /alennus load so that the marketing-
 * site /api/book endpoint can forward `sales_ref` to the CRM and
 * credit the booking to the right `myyja` user. 30-day TTL.
 */
const REF_COOKIE = "b82_ref";
const REF_VALUE = "caleb";
const REF_TTL_DAYS = 30;
const PHONE_TEL = "tel:+358401866664";
const PHONE_LABEL = "+358 40 186 6664";

type Tier = {
  duration: "1h" | "2h" | "3h";
  hours: string;
  name: string;
  strike: string;
  price: string;
  saving: string;
  badge?: { label: string; tone: "popular" | "value" };
  icon: typeof Zap;
};

const TIERS: Tier[] = [
  {
    duration: "1h",
    hours: "1 tunti",
    name: "Pyrähdys",
    strike: "169 €",
    price: "119 €",
    saving: "−50 €",
    icon: Zap,
  },
  {
    duration: "2h",
    hours: "2 tuntia",
    name: "Kesän klassikko",
    strike: "259 €",
    price: "199 €",
    saving: "−60 €",
    badge: { label: "★ Suosituin", tone: "popular" },
    icon: Sparkles,
  },
  {
    duration: "3h",
    hours: "3 tuntia",
    name: "Saaristoseikkailu",
    strike: "319 €",
    price: "249 €",
    saving: "−70 €",
    badge: { label: "Paras arvo", tone: "value" },
    icon: BadgeCheck,
  },
];

const INCLUSIONS = [
  "Polttoaine",
  "Pelastusliivit",
  "Perehdytys",
  "Turvavarusteet",
];

export default function AlennusContent() {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const expires = new Date(
      Date.now() + REF_TTL_DAYS * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `${REF_COOKIE}=${REF_VALUE}; expires=${expires}; path=/; SameSite=Lax`;
    // Tiny delay so the badge animates IN visibly after mount.
    const t = window.setTimeout(() => setArmed(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-brand-secondary text-white overflow-hidden">
      {/* Animated mesh-blob background. Two soft brand-coloured
          glows drifting on a long loop so the navy panel never
          feels static. CSS-only, GPU-cheap. */}
      <BackgroundGlow />

      <section className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        {/* Activation badge. Pulses softly to draw the eye. */}
        <div className="flex justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={
              armed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex items-center gap-2 rounded-full bg-emerald-400/15 text-emerald-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] border border-emerald-300/40"
          >
            <span className="relative grid place-items-center h-4 w-4">
              <span className="absolute inset-0 rounded-full bg-emerald-300/40 animate-ping" />
              <BadgeCheck size={12} className="relative text-emerald-100" />
            </span>
            Alennus aktivoitu
          </motion.span>
        </div>

        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="mt-6 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-2 text-xs sm:text-sm"
          >
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
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-[2.4rem] sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mt-6"
          >
            Kesän paras päivä.{" "}
            <span className="text-brand-primary italic">
              Alennettuun hintaan.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
          >
            Skannasit oikein. Valitse alta sopiva paketti tai soita
            suoraan. Alennus näkyy hinnoissa automaattisesti.
          </motion.p>
        </motion.div>

        {/* Pricing tiles. Each is its own Link to /varaa?duration=Xh. */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="mt-10 grid sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {TIERS.map((t) => (
            <motion.div key={t.duration} variants={tierFade}>
              <PricingTile tier={t} />
            </motion.div>
          ))}
        </motion.div>

        {/* Inclusions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 px-4 sm:px-5 py-4"
        >
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
        </motion.div>

        {/* Combined "Soita suoraan" + "muista mainita avajaisalennus".
            Yksi yhtenäinen lohko, koska avajaisalennuksen mainitseminen
            koskee vain puhelinpolkua. Verkkovarauksessa cookie hoitaa
            attribuution automaattisesti, joten ei toistoa. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 rounded-2xl bg-white text-brand-secondary p-5 sm:p-6"
        >
          <a
            href={PHONE_TEL}
            className="group flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand-secondary text-brand-primary shrink-0">
                <Phone size={22} />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.22em] font-bold text-brand-secondary/60">
                  Soita suoraan
                </span>
                <span className="block font-display font-extrabold text-xl sm:text-2xl tabular-nums leading-tight">
                  {PHONE_LABEL}
                </span>
              </span>
            </span>
            <ArrowRight
              size={20}
              className="text-brand-secondary/40 group-hover:translate-x-1 group-hover:text-brand-secondary transition-all"
            />
          </a>

          <div className="mt-4 pt-4 border-t border-brand-secondary/10 flex items-start gap-3">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-brand-orange/15 text-brand-orange shrink-0">
              <Megaphone size={15} />
            </span>
            <p className="text-sm leading-snug text-brand-secondary/85">
              Kun soitat, mainitse{" "}
              <strong className="text-brand-orange">avajaisalennus</strong>.
              Asiakaspalvelija kirjaa alennuksen heti.
            </p>
          </div>
        </motion.div>

        {/* Pickup line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-7 text-center text-white/65 text-xs sm:text-sm"
        >
          Lähtö: <strong className="text-white">Tervasaaren satama</strong> ·
          Tervasaarenkannas 1, 00170 Helsinki
        </motion.p>
      </section>
    </main>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const tierFade = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function PricingTile({ tier }: { tier: Tier }) {
  const Icon = tier.icon;
  const isPopular = tier.badge?.tone === "popular";
  return (
    <Link
      href={`/varaa?duration=${tier.duration}`}
      className={`group relative flex flex-col rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 ${
        isPopular
          ? "bg-white/12 border-brand-primary/70 hover:border-brand-primary"
          : "bg-white/5 border-white/15 hover:border-brand-primary/55 hover:bg-white/8"
      }`}
    >
      {tier.badge && (
        <span
          className={`absolute left-1/2 -translate-x-1/2 -top-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] whitespace-nowrap ${
            isPopular
              ? "bg-brand-primary text-brand-secondary"
              : "bg-brand-orange text-white"
          }`}
        >
          {tier.badge.label}
        </span>
      )}

      <div className="flex items-center justify-between">
        <span className="grid place-items-center h-9 w-9 rounded-xl bg-brand-primary/15 text-brand-primary">
          <Icon size={16} />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
          {tier.hours}
        </span>
      </div>

      <p className="font-display font-bold text-white text-lg mt-4">
        {tier.name}
      </p>

      <p className="text-white/45 text-sm font-semibold line-through tabular-nums mt-3">
        {tier.strike}
      </p>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <span className="font-display font-black text-white text-4xl sm:text-5xl leading-none tracking-tighter tabular-nums">
          {tier.price}
        </span>
        <span className="inline-flex items-center rounded-full bg-brand-orange/90 text-white text-[10px] font-extrabold uppercase tracking-[0.14em] px-2 py-0.5">
          {tier.saving}
        </span>
      </div>

      {/* Explicit CTA button at the bottom of the tile. The whole
          card stays clickable, but the button signals the action
          unambiguously instead of leaving the user to guess. */}
      <span
        className={`mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-display font-extrabold uppercase tracking-[0.16em] transition-colors ${
          isPopular
            ? "bg-brand-primary text-brand-secondary group-hover:bg-white"
            : "bg-white/10 text-white border border-white/25 group-hover:bg-brand-primary group-hover:text-brand-secondary group-hover:border-brand-primary"
        }`}
      >
        Varaa nyt
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div
        aria-hidden
        className="absolute -top-32 left-[10%] h-[520px] w-[520px] rounded-full bg-brand-primary/18 blur-3xl pointer-events-none alennus-glow-a"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-[5%] h-[600px] w-[600px] rounded-full bg-brand-turquoise/12 blur-3xl pointer-events-none alennus-glow-b"
      />
      <style jsx>{`
        @keyframes glowA {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 30px) scale(1.05);
          }
        }
        @keyframes glowB {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, -20px) scale(1.08);
          }
        }
        :global(.alennus-glow-a) {
          animation: glowA 14s ease-in-out infinite;
        }
        :global(.alennus-glow-b) {
          animation: glowB 18s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
