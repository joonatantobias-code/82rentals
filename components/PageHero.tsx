"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SonarRings, FloatingShapes } from "@/components/Decorations";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative bg-brand-secondary text-white pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

      {/* Custom decorations: rings + scattered shapes (subtle) */}
      <SonarRings
        className="hidden md:block absolute -right-20 -top-20 w-[380px] h-[380px] pointer-events-none"
        opacity={0.1}
      />
      <FloatingShapes className="hidden md:block absolute -left-10 top-0 w-[380px] h-[380px] opacity-25 pointer-events-none" />
      {/* Always-visible giant 82 numeral */}
      <span
        aria-hidden
        className="num82-outline-dark hidden md:block absolute right-4 md:right-10 bottom-3 md:bottom-6 font-display font-extrabold text-[6rem] md:text-[8rem] leading-none tracking-tighter select-none pointer-events-none"
      >
        82
      </span>

      {/* Soft brand-color spotlights */}
      <div className="hidden md:block absolute -top-32 -left-20 h-[360px] w-[360px] rounded-full bg-brand-primary/18 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute -bottom-24 right-1/3 h-[300px] w-[300px] rounded-full bg-brand-turquoise/14 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/70 mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Etusivu
            </Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="opacity-60" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="hover:text-white transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-brand-primary">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary"
          >
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold leading-[1.1] sm:leading-[1.08] mt-3 max-w-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[40px] md:h-[64px]"
        >
          <path
            d="M0,40 C240,80 480,10 720,32 C960,54 1200,80 1440,48 L1440,80 L0,80 Z"
            fill="#F2F6F9"
          />
        </svg>
      </div>
    </section>
  );
}
