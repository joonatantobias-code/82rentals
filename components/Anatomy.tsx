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

// Dot positions calibrated against the actual seinajoki-1 image:
//   01 Säädettävä ohjaustanko → handlebar T-bar at the top of the unit
//   02 Sininen Trixx istuin   → green/yellow Trixx seat
//   03 90 hv Rotax            → front bonnet over the engine
//   04 Kevyt runko            → hull side at the Sea-Doo wordmark
//
// Labels pinned to the four corners well inside the frame so the
// 220 px-wide cards stay safely on-canvas at any viewport. Connectors
// run diagonally between dot and label.
const HOTSPOTS: HotspotSpec[] = [
  { x: 51, y: 45, labelX: 72, labelY: 14, labelAnchor: "right", number: "01" },
  { x: 66, y: 54, labelX: 72, labelY: 86, labelAnchor: "right", number: "02" },
  { x: 42, y: 60, labelX: 28, labelY: 14, labelAnchor: "left", number: "03" },
  { x: 74, y: 58, labelX: 28, labelY: 86, labelAnchor: "left", number: "04" },
];

const STAGGER = 0.6;
// Slow, breathy ±5 px / ±2 px drift. Both axes use the same timing
// (duration / ease / delay) on label and line, so the card and the
// line endpoint stay locked together. Line origin (x1, y1) and the
// dot stay completely static — only the endpoint dances with the
// label.
const FLOAT_AMPLITUDE_Y_PX = 5;
const FLOAT_AMPLITUDE_X_PX = 2;
// Viewbox amplitudes ≈ pixels / container size in that axis at the
// reference 896x672 size (max-w-4xl, aspect 4:3).
const FLOAT_AMPLITUDE_Y_VB = 0.75; // ≈ 5 px on a 672 px-tall container
const FLOAT_AMPLITUDE_X_VB = 0.25; // ≈ 2 px on a 896 px-wide container
const FLOAT_DURATION = 12;

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

          {/* Desktop hotspots (mobile gets a list below) */}
          <div className="hidden md:block absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Single solid white line per hotspot. CSS drop-shadow on
                  the line itself gives a soft dark contrast halo without
                  the "double stroke" look of a second SVG line.
                  Endpoints (x1,y1) live on the dot's centre and never
                  move; (x2,y2) tracks the floating label, so the line
                  visibly stretches/contracts in lockstep with the card. */}
              {/* Each connector is a single solid white line. The
                  pathLength draw-on animation was producing visible
                  segmentation on some renders ("dashed" look the user
                  reported); replaced with a plain opacity fade. The
                  line is solid from frame 1 of its visibility, just
                  invisible until the entry delay. */}
              {hotspots.map((h, i) => {
                const startDelay = i * STAGGER + 0.4;
                const floatDelay = i * STAGGER + 1.1;
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={h.x}
                    y1={h.y}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      filter:
                        "drop-shadow(0 1.5px 3px rgba(10, 61, 98, 0.6))",
                    }}
                    initial={{
                      opacity: 0,
                      x2: h.labelX,
                      y2: h.labelY,
                    }}
                    animate={{
                      opacity: 1,
                      x2: [
                        h.labelX,
                        h.labelX + FLOAT_AMPLITUDE_X_VB,
                        h.labelX - FLOAT_AMPLITUDE_X_VB,
                        h.labelX + FLOAT_AMPLITUDE_X_VB,
                        h.labelX,
                      ],
                      y2: [
                        h.labelY,
                        h.labelY - FLOAT_AMPLITUDE_Y_VB,
                        h.labelY + FLOAT_AMPLITUDE_Y_VB,
                        h.labelY - FLOAT_AMPLITUDE_Y_VB,
                        h.labelY,
                      ],
                    }}
                    transition={{
                      opacity: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: startDelay,
                      },
                      x2: {
                        duration: FLOAT_DURATION,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: floatDelay,
                      },
                      y2: {
                        duration: FLOAT_DURATION,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: floatDelay,
                      },
                    }}
                  />
                );
              })}
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
                entryDelay={i * STAGGER + 0.65}
                floatDelay={i * STAGGER + 1.1}
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
  // Dot stays *anchored* — no float, no transform tweaks. The line's
  // (x1,y1) shares this exact (x, y) so wherever the dot lands, the
  // line begins. Visually the line emerges from inside the circle.
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
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="block h-[18px] w-[18px] rounded-full bg-white border-[3px] border-brand-primary shadow-[0_0_0_2px_rgba(10,61,98,0.25),0_2px_8px_rgba(0,0,0,0.25)]" />
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
  entryDelay,
  floatDelay,
}: {
  x: number;
  y: number;
  anchor: "left" | "right";
  number: string;
  title: string;
  text: string;
  entryDelay: number;
  floatDelay: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Inner motion.div carries both the entry animation and the
          perpetual float. The float keyframes start and end at 0 so
          the loop seam is invisible. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [
            0,
            FLOAT_AMPLITUDE_X_PX,
            -FLOAT_AMPLITUDE_X_PX,
            FLOAT_AMPLITUDE_X_PX,
            0,
          ],
          y: [
            0,
            -FLOAT_AMPLITUDE_Y_PX,
            FLOAT_AMPLITUDE_Y_PX,
            -FLOAT_AMPLITUDE_Y_PX,
            0,
          ],
        }}
        transition={{
          opacity: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: entryDelay,
          },
          scale: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: entryDelay,
          },
          x: {
            duration: FLOAT_DURATION,
            ease: "easeInOut",
            repeat: Infinity,
            delay: floatDelay,
          },
          y: {
            duration: FLOAT_DURATION,
            ease: "easeInOut",
            repeat: Infinity,
            delay: floatDelay,
          },
        }}
        className={`rounded-xl bg-white border border-brand-primary/40 shadow-[0_2px_6px_rgba(15,23,42,0.12),0_18px_36px_-12px_rgba(15,23,42,0.32)] px-4 py-3 w-[220px] ${
          anchor === "left" ? "text-right" : "text-left"
        }`}
      >
        <div className="flex items-baseline gap-2 text-xs font-bold tracking-wider uppercase text-brand-primary-600">
          <span className="shrink-0">{number}</span>
          <span className="text-brand-secondary leading-tight">{title}</span>
        </div>
        <p className="text-xs text-brand-secondary/75 mt-1 leading-relaxed">
          {text}
        </p>
      </motion.div>
    </div>
  );
}
