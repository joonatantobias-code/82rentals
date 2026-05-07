"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

const HOTSPOTS: HotspotSpec[] = [
  { x: 47, y: 33, labelX: 76, labelY: 17, labelAnchor: "right", number: "01" },
  { x: 60, y: 46, labelX: 77, labelY: 76, labelAnchor: "right", number: "02" },
  { x: 31, y: 58, labelX: 23, labelY: 31, labelAnchor: "left", number: "03" },
  { x: 57, y: 58, labelX: 33, labelY: 75, labelAnchor: "left", number: "04" },
];

const STAGGER = 0.55;
const FLOAT_AMPLITUDE_Y_PX = 5;
const FLOAT_AMPLITUDE_X_PX = 2;
const FLOAT_AMPLITUDE_Y_VB = 0.75;
const FLOAT_AMPLITUDE_X_VB = 0.25;
const FLOAT_DURATION = 12;

// Tasteful "easeOutExpo"-style curve used everywhere a thing settles
// into its resting position. Distinct from the float's plain easeInOut
// so the entry feels deliberate against the slow drift afterwards.
const SETTLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Anatomy() {
  const t = useT();
  const page = t.pages.vesijetti;
  const hotspots = HOTSPOTS.map((p, i) => ({
    ...p,
    title: page.hotspots[i].title,
    text: page.hotspots[i].text,
  }));

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, {
    once: true,
    margin: "-35% 0px -35% 0px",
  });

  // Hover state lives on the parent so the dot, line and label of the
  // same hotspot can all light up together when any one of them is
  // hovered. Null = nothing hovered.
  const [hovered, setHovered] = useState<number | null>(null);

  // After the entry choreography has fully landed we flip this flag,
  // which switches the dots' rx/ry transition from the slow entry curve
  // (with per-index stagger delay) to a snappy hover curve. Without
  // this, the first hover would re-use the entry transition and feel
  // sluggish.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const totalMs = (HOTSPOTS.length * STAGGER + 0.65) * 1000;
    const id = window.setTimeout(() => setEntered(true), totalMs);
    return () => window.clearTimeout(id);
  }, [inView]);

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

      <div
        ref={stageRef}
        className="relative rounded-2xl overflow-hidden bg-brand-primary-50 ring-1 ring-brand-primary/30 max-w-4xl mx-auto"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={LOCAL_PHOTOS.ownSpark1}
            alt="Sea-Doo Spark Trixx 2up sivuprofiilista"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-secondary/15" />

          {/* Single SVG owns the lines, dots, sonar-pulses and hover
              halos. All four layers share the same viewBox/coordinate
              values so anchors are pixel-locked together. Render order
              matters: lines and pulses sit beneath the halos, halos sit
              beneath the dots. */}
          <div className="hidden md:block absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <filter
                  id="hotspot-shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0.4"
                    stdDeviation="0.4"
                    floodColor="#0A3D62"
                    floodOpacity="0.6"
                  />
                </filter>
              </defs>

              {hotspots.map((h, i) => {
                const lineDelay = i * STAGGER + 0.32;
                const floatDelay = i * STAGGER + 0.95;
                const isHover = hovered === i;
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={h.x}
                    y1={h.y}
                    stroke="white"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#hotspot-shadow)"
                    initial={{
                      opacity: 0,
                      x2: h.labelX,
                      y2: h.labelY,
                      strokeWidth: 3,
                    }}
                    animate={
                      inView
                        ? {
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
                            strokeWidth: isHover ? 4 : 3,
                          }
                        : {
                            opacity: 0,
                            x2: h.labelX,
                            y2: h.labelY,
                            strokeWidth: 3,
                          }
                    }
                    transition={{
                      opacity: {
                        duration: 0.55,
                        ease: SETTLE_EASE,
                        delay: lineDelay,
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
                      strokeWidth: { duration: 0.22, ease: SETTLE_EASE },
                    }}
                  />
                );
              })}

              {/* Sonar pulse — a thin brand-primary ring that expands and
                  fades once at entry. Adds a subtle "ping" cue that the
                  dot has just landed without being noisy on the rest. */}
              {hotspots.map((h, i) => (
                <motion.ellipse
                  key={`pulse-${i}`}
                  cx={h.x}
                  cy={h.y}
                  fill="none"
                  stroke="#6EC6FF"
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                  initial={{ rx: 1.05, ry: 1.4, opacity: 0 }}
                  animate={
                    inView
                      ? {
                          rx: [1.05, 4.6],
                          ry: [1.4, 6.1],
                          opacity: [0, 0.55, 0],
                        }
                      : { rx: 1.05, ry: 1.4, opacity: 0 }
                  }
                  transition={{
                    duration: 1.35,
                    ease: SETTLE_EASE,
                    delay: i * STAGGER + 0.18,
                  }}
                />
              ))}

              {/* Hover halo — soft brand-primary blob behind the dot.
                  Fades in only when this hotspot is hovered. */}
              {hotspots.map((h, i) => (
                <motion.ellipse
                  key={`halo-${i}`}
                  cx={h.x}
                  cy={h.y}
                  rx="2.6"
                  ry="3.5"
                  fill="#6EC6FF"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hovered === i ? 0.4 : 0 }}
                  transition={{ duration: 0.22, ease: SETTLE_EASE }}
                />
              ))}

              {/* Dots — round on a 4:3 container thanks to rx ≈ ry × 3/4
                  compensating for the non-uniform scale. Also nudged a
                  touch larger when hovered. */}
              {hotspots.map((h, i) => {
                const isHover = hovered === i;
                return (
                  <motion.ellipse
                    key={`dot-${i}`}
                    cx={h.x}
                    cy={h.y}
                    fill="white"
                    stroke="#6EC6FF"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#hotspot-shadow)"
                    initial={{
                      rx: 0,
                      ry: 0,
                      opacity: 0,
                      strokeWidth: 3.2,
                    }}
                    animate={
                      inView
                        ? {
                            rx: isHover ? 1.35 : 1.05,
                            ry: isHover ? 1.8 : 1.4,
                            opacity: 1,
                            strokeWidth: isHover ? 3.6 : 3.2,
                          }
                        : { rx: 0, ry: 0, opacity: 0, strokeWidth: 3.2 }
                    }
                    transition={
                      entered
                        ? {
                            rx: { duration: 0.22, ease: SETTLE_EASE },
                            ry: { duration: 0.22, ease: SETTLE_EASE },
                            strokeWidth: { duration: 0.22, ease: SETTLE_EASE },
                            opacity: { duration: 0.22, ease: SETTLE_EASE },
                          }
                        : {
                            rx: {
                              duration: 0.55,
                              ease: SETTLE_EASE,
                              delay: i * STAGGER,
                            },
                            ry: {
                              duration: 0.55,
                              ease: SETTLE_EASE,
                              delay: i * STAGGER,
                            },
                            opacity: {
                              duration: 0.55,
                              ease: SETTLE_EASE,
                              delay: i * STAGGER,
                            },
                            strokeWidth: { duration: 0.22, ease: SETTLE_EASE },
                          }
                    }
                  />
                );
              })}
            </svg>

            {hotspots.map((h, i) => (
              <Label
                key={`label-${i}`}
                x={h.labelX}
                y={h.labelY}
                number={h.number}
                title={h.title}
                text={h.text}
                entryDelay={i * STAGGER + 0.55}
                floatDelay={i * STAGGER + 0.95}
                inView={inView}
                isHovered={hovered === i}
                onHover={(v) => setHovered(v ? i : null)}
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

function Label({
  x,
  y,
  number,
  title,
  text,
  entryDelay,
  floatDelay,
  inView,
  isHovered,
  onHover,
}: {
  x: number;
  y: number;
  number: string;
  title: string;
  text: string;
  entryDelay: number;
  floatDelay: number;
  inView: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Outer wrapper handles hover (lift + scale) so it composites
          cleanly with the inner element's float-keyframe transform. */}
      <motion.div
        animate={{
          y: isHovered ? -3 : 0,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.22, ease: SETTLE_EASE }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            inView
              ? {
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
                }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{
            opacity: {
              duration: 0.55,
              ease: SETTLE_EASE,
              delay: entryDelay,
            },
            scale: {
              duration: 0.55,
              ease: SETTLE_EASE,
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
          className={`rounded-xl bg-white border border-brand-primary/40 px-4 py-3 w-[220px] text-left cursor-default transition-shadow duration-200 ${
            isHovered
              ? "shadow-[0_4px_12px_rgba(15,23,42,0.18),0_28px_60px_-14px_rgba(10,61,98,0.55)]"
              : "shadow-[0_2px_6px_rgba(15,23,42,0.12),0_18px_36px_-12px_rgba(15,23,42,0.32)]"
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
      </motion.div>
    </div>
  );
}
