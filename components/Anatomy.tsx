"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";
import { useT } from "@/components/LocaleProvider";

type HotspotSpec = {
  // Dot position, % of container.
  x: number;
  y: number;
  // Label-card centre position, % of container. Connector line goes
  // diagonally from (x,y) to (labelX,labelY), so labels can be placed
  // around the perimeter of the image without colliding.
  labelX: number;
  labelY: number;
  // Which side of the label box the connector should appear to enter
  // from. Determines the visual alignment (right-aligned text on a
  // label whose connector enters from the right, etc.).
  labelAnchor: "right" | "left";
  number: string;
};

// Calibrated against LOCAL_PHOTOS.ownSpark1 — Sea-Doo Spark Trixx
// side-profile on the trailer in Seinäjoki. The image is 4:3 so the
// percentages here line up with where the features actually sit.
//
// Dots:
//   01 Säädettävä ohjaustanko → handlebar riser at the top of the unit
//   02 Sininen Trixx istuin   → green/yellow seat behind the bars
//   03 90 hv Rotax            → front bonnet over the engine
//   04 Kevyt runko            → hull side at the "P154021" markings
//
// Labels are pushed to the corners so the diagonal connectors give
// each card breathing room — no two labels overlap.
const HOTSPOTS: Omit<HotspotSpec, never>[] = [
  { x: 54, y: 50, labelX: 80, labelY: 22, labelAnchor: "right", number: "01" },
  { x: 70, y: 55, labelX: 88, labelY: 60, labelAnchor: "right", number: "02" },
  { x: 30, y: 60, labelX: 12, labelY: 36, labelAnchor: "left", number: "03" },
  { x: 45, y: 66, labelX: 16, labelY: 84, labelAnchor: "left", number: "04" },
];

// Per-hotspot stagger. Each hotspot's full sequence (dot → line →
// label) takes ~0.9 s; we start the next one 0.55 s after the
// previous, so the four read as a clear left-to-right wave starting
// from 01.
const STAGGER = 0.55;

export default function Anatomy() {
  const t = useT();
  const page = t.pages.vesijetti;
  const hotspots = HOTSPOTS.map((p, i) => ({
    ...p,
    title: page.hotspots[i].title,
    text: page.hotspots[i].text,
  }));

  return (
    <section className="section relative">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -right-20" />

      <div className="relative max-w-3xl mb-10 md:mb-12">
        <span className="section-eyebrow">{page.anatomyEyebrow}</span>
        <h2 className="section-title">{page.anatomyTitle}</h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          {page.anatomyBody}
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-brand-primary-50 ring-1 ring-brand-primary/30 max-w-4xl mx-auto">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={LOCAL_PHOTOS.ownSpark1}
            alt="Sea-Doo Spark Trixx 2up sivuprofiilista"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-secondary/10" />

          {/* Desktop hotspots — connector lines + dots + labels. The
              SVG sits below the dots and labels in stacking order so
              the line endings get covered by the cards. Mobile gets a
              plain list (rendered just below). */}
          <div className="hidden md:block absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {hotspots.map((h, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={h.x}
                  y1={h.y}
                  x2={h.labelX}
                  y2={h.labelY}
                  stroke="#6EC6FF"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.85 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * STAGGER + 0.25,
                  }}
                />
              ))}
            </svg>

            {hotspots.map((h, i) => (
              <Dot
                key={`dot-${i}`}
                x={h.x}
                y={h.y}
                delay={i * STAGGER}
              />
            ))}

            {hotspots.map((h, i) => (
              <Label
                key={`label-${i}`}
                x={h.labelX}
                y={h.labelY}
                anchor={h.labelAnchor}
                number={h.number}
                title={h.title}
                text={h.text}
                delay={i * STAGGER + 0.55}
              />
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

function Dot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 18,
        delay,
      }}
      className="absolute grid place-items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="absolute inline-flex h-6 w-6 rounded-full bg-brand-primary animate-pulse-ring" />
      <span className="relative inline-flex h-5 w-5 rounded-full bg-brand-primary border-2 border-white shadow-soft" />
    </motion.span>
  );
}

function Label({
  x,
  y,
  anchor,
  number,
  title,
  text,
  delay,
}: {
  x: number;
  y: number;
  anchor: "left" | "right";
  number: string;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay }}
      className={`absolute rounded-xl bg-white shadow-soft border border-brand-primary/30 px-4 py-3 max-w-[220px] ${
        anchor === "left" ? "text-right" : "text-left"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-brand-primary-600">
        <span>{number}</span>
        <span className="text-brand-secondary truncate">{title}</span>
      </div>
      <p className="text-xs text-brand-secondary/75 mt-1 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}
