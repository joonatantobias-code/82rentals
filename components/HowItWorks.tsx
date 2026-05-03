"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Truck, Waves, RotateCcw, type LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  text: string;
  bg: string;
  fg: string;
};

const steps: Step[] = [
  {
    icon: CalendarCheck,
    title: "Valitse aika",
    text: "Päivä, kesto ja vesijettien määrä. Maksat verkossa, valmista 60 sekunnissa.",
    bg: "bg-brand-primary",
    fg: "text-brand-secondary",
  },
  {
    icon: Truck,
    title: "Me toimitamme",
    text: "Tuomme Sea-Doon mihin tahansa rantaan tai laituriin Helsingissä valitsemaasi aikaan.",
    bg: "bg-brand-secondary",
    fg: "text-white",
  },
  {
    icon: Waves,
    title: "Aja minne tahansa",
    text: "Lyhyt opastus, tankki täynnä, pelastusliivit valmiina. Saaristo on sinun.",
    bg: "bg-brand-turquoise",
    fg: "text-brand-secondary",
  },
  {
    icon: RotateCcw,
    title: "Helppo palautus",
    text: "Me haemme vesijetin pois. Ei perävaunuja, ei parkkihuolia, vain muistoja.",
    bg: "bg-brand-primary",
    fg: "text-brand-secondary",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section relative">
      <div className="blob-primary w-[280px] h-[280px] top-10 -right-20" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 -left-20" />

      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
        <span className="section-eyebrow">Näin se toimii</span>
        <h2 className="section-title">
          Selauksesta vesille neljässä helpossa askeleessa.
        </h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          Me hoidamme logistiikan. Sinä hoidat kaasukahvan.
        </p>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative group"
          >
            {/* Step number sticker */}
            <span className="absolute -top-3 -left-3 z-10 sticker">
              0{i + 1}
            </span>
            <div className="card p-6 sm:p-7 h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              {/* Decorative arc inside card */}
              <svg
                viewBox="0 0 200 100"
                className="absolute -bottom-2 -right-2 w-32 opacity-40 text-brand-primary"
                aria-hidden
              >
                <path
                  d="M0,80 Q50,40 100,80 T200,80"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div
                className={`relative h-14 w-14 rounded-2xl ${step.bg} ${step.fg} grid place-items-center shadow-soft group-hover:scale-110 transition-transform`}
              >
                <step.icon size={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-secondary mt-5">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-brand-secondary/70 leading-relaxed">
                {step.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
