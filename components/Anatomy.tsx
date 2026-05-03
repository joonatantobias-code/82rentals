"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";

type Hotspot = {
  /** percentage from left edge of the image */
  x: number;
  /** percentage from top edge of the image */
  y: number;
  /** label position relative to the dot */
  side: "left" | "right";
  number: string;
  title: string;
  text: string;
};

const hotspots: Hotspot[] = [
  {
    x: 52,
    y: 22,
    side: "right",
    number: "01",
    title: "Säädettävä ohjaustanko",
    text: "Riser tuo ajoasennon ylös ja helpottaa temppuilua.",
  },
  {
    x: 38,
    y: 38,
    side: "left",
    number: "02",
    title: "Sininen Trixx istuin",
    text: "Mukava 2up istuin, mahtuu kaveri tai kumppani.",
  },
  {
    x: 28,
    y: 56,
    side: "left",
    number: "03",
    title: "90 hv Rotax",
    text: "Sähköinen iBR jarru ja peruutus, kiihdytys tuntuu heti.",
  },
  {
    x: 70,
    y: 70,
    side: "right",
    number: "04",
    title: "Kevyt runko",
    text: "Alle 200 kg kuivapaino tekee jetistä leikkisän.",
  },
];

export default function Anatomy() {
  return (
    <section className="section relative">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -right-20" />

      <div className="relative max-w-3xl mb-10 md:mb-12">
        <span className="section-eyebrow">Tutustu jettiin</span>
        <h2 className="section-title">Mistä Spark Trixx koostuu.</h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          Tärkeimmät ominaisuudet kerralla. Käyttöönotto vie minuutteja.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-brand-primary-50 ring-1 ring-brand-primary/30 max-w-4xl mx-auto">
        <div className="relative aspect-[4/3] w-full">
          {/* Blurred backdrop extends the studio shot to fill the frame */}
          <Image
            src={LOCAL_PHOTOS.blue1}
            alt=""
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover scale-110 blur-2xl opacity-50"
            aria-hidden
          />
          <div className="absolute inset-0 bg-brand-primary-50/40" />
          {/* Sharp foreground */}
          <Image
            src={LOCAL_PHOTOS.blue1}
            alt="Sea-Doo Spark Trixx"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="relative object-contain p-3 md:p-6"
          />
          <div className="absolute inset-0 bg-brand-secondary/8" />

          {/* Hotspots (desktop only — mobile gets a list below) */}
          <div className="hidden md:block absolute inset-0">
            {hotspots.map((h, i) => (
              <Hotspot key={i} hotspot={h} delay={i * 0.12} />
            ))}
          </div>
        </div>

        {/* Mobile list */}
        <ul className="md:hidden divide-y divide-brand-primary/20 bg-white">
          {hotspots.map((h) => (
            <li key={h.number} className="p-5 flex items-start gap-4">
              <span className="h-9 w-9 rounded-full bg-brand-primary text-brand-secondary grid place-items-center font-display font-extrabold shrink-0">
                {h.number}
              </span>
              <div>
                <h4 className="font-display font-semibold text-brand-secondary">
                  {h.title}
                </h4>
                <p className="text-sm text-brand-secondary/70 mt-1 leading-relaxed">
                  {h.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hotspot({ hotspot, delay }: { hotspot: Hotspot; delay: number }) {
  const { x, y, side, number, title, text } = hotspot;
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Pulsing dot */}
      <span className="relative grid place-items-center">
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-brand-primary animate-pulse-ring" />
        <span className="relative inline-flex h-5 w-5 rounded-full bg-brand-primary border-2 border-white shadow-soft" />
      </span>

      {/* Connector line + label */}
      <div
        className={`absolute top-1/2 ${
          isLeft ? "right-full mr-2" : "left-full ml-2"
        } -translate-y-1/2 flex items-center gap-2 ${
          isLeft ? "flex-row-reverse" : ""
        }`}
      >
        <span
          className={`h-px w-12 bg-brand-primary`}
          aria-hidden
        />
        <div
          className={`rounded-xl bg-white shadow-soft border border-brand-primary/30 px-4 py-3 max-w-[220px] ${
            isLeft ? "text-right" : ""
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-brand-primary-600">
            <span>{number}</span>
            <span className="text-brand-secondary truncate">{title}</span>
          </div>
          <p className="text-xs text-brand-secondary/75 mt-1 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
