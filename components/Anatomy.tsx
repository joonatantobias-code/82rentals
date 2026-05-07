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

// Dot positions (% of container). The same x/y values are used to
// render the line's start point AND the dot's centre — both inside
// one SVG with the same viewBox — so the two can never disagree.
const HOTSPOTS: HotspotSpec[] = [
  { x: 51, y: 45, labelX: 72, labelY: 14, labelAnchor: "right", number: "01" },
  { x: 66, y: 54, labelX: 72, labelY: 86, labelAnchor: "right", number: "02" },
  { x: 42, y: 60, labelX: 28, labelY: 14, labelAnchor: "left", number: "03" },
  { x: 74, y: 58, labelX: 28, labelY: 86, labelAnchor: "left", number: "04" },
];

const STAGGER = 0.6;
// Slow ambient drift on the label and the line endpoint. Both axes
// use the same timing, easing and start delay so the card and the
// line dance in lockstep. Line origin and dot stay fully static.
const FLOAT_AMPLITUDE_Y_PX = 5;
const FLOAT_AMPLITUDE_X_PX = 2;
// SVG viewBox is 100x100 with preserveAspectRatio="none", so 1 unit
// in either axis ≈ 1 % of the container. Convert px → vb at the
// reference 896×672 size.
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

          {/* Single SVG owns BOTH the connector lines and the dots.
              Same viewBox + same coordinate values means line origin
              and dot centre are pixel-identical. Move a hotspot's
              x/y in HOTSPOTS and both move together. Labels stay as
              HTML divs (positioned by percentage) so they remain
              accessible text content. */}
          <div className="hidden md:block absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                {/* Soft drop shadow under both lines and dots so they
                    pop off bright sky / pale asphalt without needing
                    a second SVG element. */}
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
                const lineDelay = i * STAGGER + 0.4;
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
                    filter="url(#hotspot-shadow)"
                    initial={{ opacity: 0, x2: h.labelX, y2: h.labelY }}
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
                    }}
                  />
                );
              })}

              {hotspots.map((h, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={h.x}
                  cy={h.y}
                  fill="white"
                  stroke="#6EC6FF"
                  strokeWidth="3.2"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#hotspot-shadow)"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 1.4, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.9,
                    delay: i * STAGGER,
                  }}
                />
              ))}
            </svg>

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
