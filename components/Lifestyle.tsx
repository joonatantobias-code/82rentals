"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";
import BrushUnderline from "@/components/BrushUnderline";
import CountUp from "@/components/CountUp";

const stats = [
  {
    to: 1000,
    decimals: 0,
    suffix: "+",
    label: "Tyytyväistä ajajaa",
    color: "text-brand-secondary",
  },
  {
    to: 4.9,
    decimals: 1,
    suffix: "★",
    label: "Keskiarvosana",
    color: "text-brand-primary-600",
  },
  {
    to: 100,
    decimals: 0,
    suffix: "%",
    label: "Toimitus Helsinkiin",
    color: "text-brand-turquoise",
  },
  {
    to: 60,
    decimals: 0,
    suffix: "s",
    label: "Varaus valmis",
    color: "text-brand-secondary",
  },
];

export default function Lifestyle() {
  return (
    <section className="relative my-12 md:my-24">
      <div className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src={LOCAL_PHOTOS.coupleAction}
          alt="Kaverit vesillä"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Solid color overlays */}
        <div className="absolute inset-0 bg-brand-secondary/70" />
        <div className="absolute inset-0 pattern-dots opacity-15 mix-blend-overlay" />

        {/* Decorative outlined 82 over the photo */}
        <span
          aria-hidden
          className="num82-outline-dark hidden md:block absolute -top-2 right-6 lg:right-14 font-display font-extrabold text-[9rem] lg:text-[12rem] leading-none tracking-tighter select-none pointer-events-none"
        >
          82
        </span>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-12 md:pb-20 w-full">
            <div className="max-w-2xl text-white">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-primary"
              >
                <span className="h-2 w-2 rounded-full bg-brand-primary" />
                Tutustu meihin
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-[2.2rem] sm:text-5xl md:text-6xl font-extrabold mt-3 leading-[1.05]"
              >
                Nuori porukka, johon voit{" "}
                <span className="relative inline-block text-brand-primary">
                  luottaa
                  <BrushUnderline
                    variant="spray"
                    delay={0.7}
                    duration={1.1}
                    thickness={9}
                  />
                </span>
                .
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-5 text-base sm:text-lg text-white/85 max-w-xl"
              >
                82Rentals on kolmen helsinkiläisen kaverin perustama yritys.
                Pidämme Spark Trixxin huippukunnossa, vastaamme heti ja saavumme
                aina sovittuun aikaan. Olemme itse vesillä joka viikko, joten
                kalustomme on aina kuin omasta tallista.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stats overlap, solid colors */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 -mt-10 md:-mt-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="card grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5 overflow-hidden"
        >
          {stats.map((s) => (
            <div key={s.label} className="p-5 sm:p-8 text-center">
              <div
                className={`font-display text-3xl md:text-4xl font-extrabold tabular-nums ${s.color}`}
              >
                <CountUp
                  to={s.to}
                  decimals={s.decimals}
                  suffix={s.suffix}
                />
              </div>
              <div className="text-[11px] sm:text-sm uppercase tracking-wider text-brand-secondary/65 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
