"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/**
 * Hand drawn, spray paint style underline that draws itself in when the
 * parent scrolls into view. The path is mostly straight with a slight
 * upward slant from left to right. SVG turbulence + displacement gives it
 * a rough, sprayed-edge feel similar to real graffiti tag.
 *
 * Usage:
 *   <span className="relative">
 *     word
 *     <BrushUnderline />
 *   </span>
 */
export default function BrushUnderline({
  className = "",
  color = "#6EC6FF",
  delay = 0.25,
  duration = 0.95,
  variant = "spray",
  thickness = 8,
}: {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
  /** "spray" = straight tilted-up sprayed line, "swoop" = single curve, "scribble" = wavy */
  variant?: "spray" | "swoop" | "scribble";
  thickness?: number;
}) {
  const id = useId().replace(/:/g, "");
  const filterId = `brush-${id}`;

  const path =
    variant === "scribble"
      ? "M2,12 C 50,3 90,18 140,9 T 220,11 T 290,5 T 318,9"
      : variant === "swoop"
      ? "M3,13 C 60,5 130,15 200,9 S 280,4 318,9"
      : // "spray" — straight, slight upward tilt from bottom-left to top-right
        "M4,14 L 318,5";

  return (
    <motion.svg
      viewBox="0 0 320 20"
      preserveAspectRatio="none"
      className={`absolute left-0 right-0 -bottom-1 sm:-bottom-2 w-full h-3 sm:h-4 pointer-events-none overflow-visible ${className}`}
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
    >
      <defs>
        {/* Roughens the stroke edge to mimic spray paint */}
        <filter id={filterId} x="-10%" y="-50%" width="120%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </defs>

      {/* Soft halo behind main stroke */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={thickness + 6}
        strokeLinecap="round"
        fill="none"
        opacity={0.18}
        filter={`url(#${filterId})`}
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1 },
        }}
        transition={{
          duration,
          ease: [0.6, 0.05, 0.1, 0.95],
          delay,
        }}
      />

      {/* Main spray stroke */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        fill="none"
        filter={`url(#${filterId})`}
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1 },
        }}
        transition={{
          duration,
          ease: [0.6, 0.05, 0.1, 0.95],
          delay,
        }}
      />

      {/* Small spray dots scattered along the line for that tag feel */}
      {variant === "spray" && (
        <motion.g
          fill={color}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{
            duration: duration * 0.6,
            delay: delay + duration * 0.4,
          }}
        >
          <circle cx="12" cy="17" r="1.4" />
          <circle cx="60" cy="3" r="1" />
          <circle cx="116" cy="16" r="1.6" />
          <circle cx="180" cy="2" r="1.2" />
          <circle cx="248" cy="14" r="1" />
          <circle cx="306" cy="2" r="1.5" />
        </motion.g>
      )}
    </motion.svg>
  );
}
