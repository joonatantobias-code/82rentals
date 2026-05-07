"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";
import { useT } from "@/components/LocaleProvider";

type HotspotSpec = {
  // Dot position, % of container.
  x: number;
  y: number;
  // Label centre position, % of container.
  labelX: number;
  labelY: number;
  labelAnchor: "right" | "left";
  number: string;
};

// Dot positions calibrated against the actual seinajoki-1 image
// content. Read each title and pin it on the matching feature:
//
//   01 Säädettävä ohjaustanko → black T-bar at the very top of the
//      jet ski (x≈51, y≈45 — the handlebars)
//   02 Sininen Trixx istuin   → highest point of the green/yellow
//      seat (x≈66, y≈54)
//   03 90 hv Rotax            → middle of the front bonnet, where
//      the engine lives under the cover (x≈42, y≈60)
//   04 Kevyt runko            → side of the hull at the Sea-Doo
//      wordmark (x≈74, y≈58)
//
// Labels pinned to the four corners of the image, connectors run
// diagonally between dot and label so each card has its own free
// quadrant.
const HOTSPOTS: HotspotSpec[] = [
  // Labels pulled fully inside the frame: x=72 / x=28 so the 220 px
  // cards stop at ~83 % / 17 % of the container, well clear of the
  // edge on every viewport.
  { x: 51, y: 45, labelX: 72, labelY: 14, labelAnchor: "right", number: "01" },
  { x: 66, y: 54, labelX: 72, labelY: 86, labelAnchor: "right", number: "02" },
  { x: 42, y: 60, labelX: 28, labelY: 14, labelAnchor: "left", number: "03" },
  { x: 74, y: 58, labelX: 28, labelY: 86, labelAnchor: "left", number: "04" },
];

// 0.6 s stagger reads as a clear sequential wave 01 → 02 → 03 → 04
// while still feeling fluid (each new hotspot starts as the previous
// one's label is settling).
const STAGGER = 0.6;

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
              {/* Each connector is two lines drawing in unison:
                    - a wide dark "halo" underneath for contrast,
                    - a slimmer solid white line on top.
                  vector-effect: non-scaling-stroke so strokeWidth is
                  read in device pixels — that's what makes the lines
                  legible at any viewport width. The previous build
                  used 0.7 px (a hairline that read as a dotted dash);
                  these are 5 px / 2.5 px, properly solid.
                  Endpoints are pinned to (h.x, h.y) on one end and
                  (h.labelX, h.labelY) on the other, so moving the
                  dot in HOTSPOTS automatically moves the line's
                  origin with it. */}
              {hotspots.map((h, i) => (
                <motion.line
                  key={`halo-${i}`}
                  x1={h.x}
                  y1={h.y}
                  x2={h.labelX}
                  y2={h.labelY}
                  stroke="#0A3D62"
                  strokeWidth="5"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
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
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
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
      {/* Solid white dot with a brand-primary ring. The line endpoint
          sits at this dot's centre, so the line visually emerges from
          inside the circle — no separate pulse halo to drown it out. */}
      <span className="relative inline-flex h-[18px] w-[18px] rounded-full bg-white border-[3px] border-brand-primary shadow-[0_0_0_2px_rgba(10,61,98,0.25),0_2px_8px_rgba(0,0,0,0.25)]" />
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
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={`absolute rounded-xl bg-white border border-brand-primary/40 shadow-[0_2px_6px_rgba(15,23,42,0.12),0_18px_36px_-12px_rgba(15,23,42,0.32)] px-4 py-3 w-[220px] ${
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
