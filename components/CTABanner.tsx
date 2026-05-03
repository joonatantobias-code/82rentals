"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SonarRings, FloatingShapes } from "@/components/Decorations";

export default function CTABanner({
  title = "Valmiina vesille?",
  subtitle = "Varaa Sea-Doo Spark Trixx 60 sekunnissa, toimitamme sen sinulle minne tahansa Helsingissä.",
  primaryHref = "/varaa",
  primaryLabel = "Varaa nyt",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="px-5 sm:px-8 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden bg-brand-secondary text-white p-7 sm:p-10 md:p-14 shadow-soft"
      >
        {/* Pattern + spotlight discs */}
        <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />
        <div className="hidden md:block absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full bg-brand-primary/20 blur-3xl pointer-events-none" />
        <div className="hidden md:block absolute -bottom-24 -left-24 h-[260px] w-[260px] rounded-full bg-brand-turquoise/18 blur-3xl pointer-events-none" />

        {/* Custom decoration: subtle rings + scattered shapes */}
        <SonarRings
          className="hidden md:block absolute -right-24 -top-24 w-[320px] h-[320px] pointer-events-none"
          opacity={0.12}
        />
        <FloatingShapes className="hidden lg:block absolute right-2 bottom-2 w-[260px] h-[260px] opacity-25 pointer-events-none" />

        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              Valmiina lähtemään
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] mt-3">
              {title}
            </h2>
            <p className="mt-4 text-white/85 text-base sm:text-lg max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Single button only — Varaa nyt */}
          <div className="flex md:justify-end">
            <Link
              href={primaryHref}
              className="btn-light w-full sm:w-auto justify-center !px-8 !py-5 text-base"
            >
              {primaryLabel}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
