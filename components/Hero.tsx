"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { unsplashUrl } from "@/lib/images";
import { FloatingShapes, GeoBurst } from "@/components/Decorations";
import BrushUnderline from "@/components/BrushUnderline";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import { useT } from "@/components/LocaleProvider";

export default function Hero() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center bg-brand-secondary"
    >
      {/* Background video. Looping is handled by HeroBackgroundVideo,
          which crossfades between two stacked players so the end → start
          seam doesn't show. preload="auto" inside it keeps the standby
          decoder warm so the handoff is jank-free. */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundVideo
          src="https://videos.pexels.com/video-files/18074526/18074526-hd_1280_720_24fps.mp4"
          poster={unsplashUrl("jetskiSplash", { w: 2400 })}
        />
        {/* Solid color overlays, no gradients */}
        <div className="absolute inset-0 bg-brand-secondary/65" />
        <div className="absolute inset-0 bg-brand-secondary/30 md:bg-transparent" />
        {/* Brand-color spotlights as solid blurred discs */}
        <div className="hidden md:block absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-brand-primary/25 blur-3xl" />
        <div className="hidden md:block absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-brand-turquoise/22 blur-3xl" />
      </div>

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 z-0 pattern-dots opacity-15 mix-blend-overlay pointer-events-none" />

      {/* Geometric shapes — triangles, plusses, diamonds (subtle) */}
      <FloatingShapes className="hidden md:block absolute -left-10 bottom-0 w-[420px] h-[420px] z-0 pointer-events-none opacity-30" />
      <GeoBurst className="hidden md:block absolute -right-16 top-16 w-[460px] h-[460px] z-0 pointer-events-none opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-white">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-sm"
            >
              <MapPin size={14} className="text-brand-primary" />
              <span>{t.hero.location}</span>
              <span className="opacity-50">•</span>
              <span className="flex items-center gap-1">
                <Star size={12} className="text-brand-primary fill-brand-primary" />
                {t.hero.ratingLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-extrabold text-[2.5rem] sm:text-5xl lg:text-7xl leading-[1.1] sm:leading-[1.06] lg:leading-[1.04] tracking-tight mt-6"
            >
              {t.hero.title1}{" "}
              <span className="relative inline-block text-brand-primary">
                {t.hero.titleHighlight}
                <BrushUnderline variant="spray" delay={0.7} duration={1.1} thickness={10} />
              </span>{" "}
              {t.hero.title2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-white/85 max-w-xl"
            >
              {t.hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
            >
              <Link href="/varaa" className="btn-light !px-7">
                {t.hero.cta} <ArrowRight size={18} />
              </Link>
            </motion.div>

          </div>

          {/* Spec card. Entrance is driven by the .offer-card-fade-in
              keyframe (in globals.css), which ramps backdrop-filter from
              blur(0) to blur(12px) alongside the translate/opacity so the
              glass effect builds up smoothly instead of popping in at
              the end of the fade. */}
          <div className="lg:col-span-5">
            <Link
              href="/varaa?duration=2h"
              className="offer-card-fade-in group relative block rounded-2xl bg-brand-secondary/35 border border-white/20 p-6 md:p-7 text-white shadow-glow overflow-hidden hover:bg-brand-secondary/45 hover:border-brand-primary/60 transition-colors transform-gpu"
            >
              <span
                aria-hidden
                className="num82-outline-dark absolute -right-2 -top-1 font-display font-extrabold text-[5.5rem] leading-none select-none pointer-events-none tracking-tight"
              >
                82
              </span>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-primary font-semibold">
                  {t.hero.offerEyebrow}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 leading-tight">
                  {t.hero.offerProduct}
                  <br />
                  <span className="text-brand-primary">{t.hero.offerPrice}</span>
                </h3>
                <ul className="mt-5 space-y-2.5 text-sm text-white/85">
                  <Tick text={t.hero.offerTick1} />
                  <Tick text={t.hero.offerTick2} />
                  <Tick text={t.hero.offerTick3} />
                </ul>
                <span className="group/btn mt-6 inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-brand-primary text-brand-secondary font-bold py-3 text-sm shadow-glow hover:bg-white transition-colors min-h-[44px]">
                  {t.hero.offerCta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bullets pulled out of the col-span-7 column so they have the
            full hero width and stay on a single line on desktop instead
            of wrapping. Wraps gracefully on mobile. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 lg:mt-14 flex flex-wrap lg:flex-nowrap items-center gap-x-6 lg:gap-x-10 gap-y-3 text-sm text-white/85"
        >
          <Bullet text={t.hero.bullet1} />
          <Bullet text={t.hero.bullet2} />
          <Bullet text={t.hero.bullet3} />
        </motion.div>
      </div>

      {/* Wave divider, solid color */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[60px] md:h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,120 480,40 720,60 C960,80 1200,120 1440,80 L1440,120 L0,120 Z"
            fill="#F2F6F9"
          />
        </svg>
      </div>
    </section>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function Tick({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="relative grid place-items-center w-4 h-4 rounded-full bg-brand-primary shrink-0">
        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-brand-secondary">
          <path
            d="M2.5 6.5 L5 9 L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {text}
    </li>
  );
}
