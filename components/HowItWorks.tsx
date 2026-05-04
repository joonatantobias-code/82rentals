"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Truck, Waves, RotateCcw, type LucideIcon } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

type Step = {
  icon: LucideIcon;
  bg: string;
  fg: string;
};

const STEP_VISUAL: Step[] = [
  { icon: CalendarCheck, bg: "bg-brand-primary", fg: "text-brand-secondary" },
  { icon: Truck, bg: "bg-brand-secondary", fg: "text-white" },
  { icon: Waves, bg: "bg-brand-turquoise", fg: "text-brand-secondary" },
  { icon: RotateCcw, bg: "bg-brand-primary", fg: "text-brand-secondary" },
];

export default function HowItWorks() {
  const t = useT();
  const steps = STEP_VISUAL.map((s, i) => ({
    ...s,
    title: [
      t.howItWorks.step1Title,
      t.howItWorks.step2Title,
      t.howItWorks.step3Title,
      t.howItWorks.step4Title,
    ][i],
    text: [
      t.howItWorks.step1Text,
      t.howItWorks.step2Text,
      t.howItWorks.step3Text,
      t.howItWorks.step4Text,
    ][i],
  }));
  return (
    <section id="how" className="section relative">
      <div className="blob-primary w-[280px] h-[280px] top-10 -right-20" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 -left-20" />

      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
        <span className="section-eyebrow">{t.howItWorks.eyebrow}</span>
        <h2 className="section-title">{t.howItWorks.title}</h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          {t.howItWorks.subtitle}
        </p>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative group"
          >
            <span className="absolute -top-3 -left-3 z-10 sticker">
              0{i + 1}
            </span>
            <div className="card p-6 sm:p-7 h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
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
