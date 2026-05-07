"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";
import { useT } from "@/components/LocaleProvider";

type HotspotSpec = {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: "right" | "left";
  number: string;
};

// Calibrated against LOCAL_PHOTOS.ownSpark1 (Spark Trixx side-profile,
// Seinäjoki). The four jet-ski features actually live in a band
// y≈55–68 % of the 4:3 frame.
//
// Dot positions:
//   01 Säädettävä ohjaustanko → handlebar T-bar above the front of
//      the unit
//   02 Sininen Trixx istuin   → green/yellow Trixx seat
//   03 90 hv Rotax            → front bonnet over the engine
//   04 Kevyt runko            → hull side at the Sea-Doo wordmark
//
// Labels pinned to the four corners (centres pulled in to 22 / 75 %
// so the 220 px cards stay well inside the container — no clipping
// at the right edge any more), connectors run diagonally between dot
// and label.
const HOTSPOTS: HotspotSpec[] = [
  { x: 52, y: 56, labelX: 75, labelY: 18, labelAnchor: "right", number: "01" },
  { x: 64, y: 60, labelX: 78, labelY: 82, labelAnchor: "right", number: "02" },
  { x: 33, y: 64, labelX: 22, labelY: 18, labelAnchor: "left", number: "03" },
  { x: 68, y: 66, labelX: 22, labelY: 82, labelAnchor: "left", number: "04" },
];

// Each hotspot's full sequence (dot → line → label) takes about 1 s.
// We stagger 0.65 s between, so the four read as a smooth wave from
// 01 → 02 → 03 → 04 with a gentle overlap rather than four hard pops.
const STAGGER = 0.65;

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
          <div className="absolute inset-0 bg-brand-secondary/15" />

          {/* Desktop hotspots layered as: connector lines → dots → labels.
              Mobile gets a plain stacked list below. */}
          <div className="hidden md:block absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Each connector is two stroked lines: a soft white halo
                  underneath, the brand-primary line on top. Together they
                  read clearly against any photo content. The halo is
                  drawn first so it sits behind. */}
              {hotspots.map((h, i) => (
                <motion.line
                  key={`halo-${i}`}
                  x1={h.x}
                  y1={h.y}
                  x2={h.labelX}
                  y2={h.labelY}
                  stroke="white"
                  strokeWidth="0.9"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * STAGGER + 0.3,
                  }}
                />
              ))}
              {hotspots.map((h, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={h.x}
                  y1={h.y}
                  x2={h.labelX}
                  y2={h.labelY}
                  stroke="#6EC6FF"
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * STAGGER + 0.3,
                  }}
                />
              ))}
            </svg>

            {hotspots.map((h, i) => (
              <Dot key={`dot-${i}`} x={h.x} y={h.y} delay={i * STAGGER} />
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
                delay={i * STAGGER + 0.65}
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
        // Slightly softer spring than before — less bouncy, more
        // confident landing. damping ratio ≈ 0.85.
        type: "spring",
        stiffness: 240,
        damping: 22,
        mass: 0.9,
        delay,
      }}
      className="absolute grid place-items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="absolute inline-flex h-7 w-7 rounded-full bg-brand-primary/40 animate-pulse-ring" />
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
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      className={`absolute rounded-xl bg-white shadow-soft border border-brand-primary/30 px-4 py-3 w-[220px] ${
        anchor === "left" ? "text-right" : "text-left"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-baseline gap-2 text-xs font-bold tracking-wider uppercase text-brand-primary-600">
        <span className="shrink-0">{number}</span>
        <span className="text-brand-secondary leading-tight">{title}</span>
      </div>
      <p className="text-xs text-brand-secondary/75 mt-1 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}
