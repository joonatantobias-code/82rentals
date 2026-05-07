"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOCAL_PHOTOS } from "@/lib/images";
import { useT } from "@/components/LocaleProvider";

type Hotspot = {
  x: number;
  y: number;
  side: "left" | "right";
  number: string;
  title: string;
  text: string;
};

// Hotspot positions calibrated against the side-profile shot of our
// own jet ski (LOCAL_PHOTOS.ownSpark1 — Spark Trixx on the trailer
// in Seinäjoki). The image is 4:3, so percentages here line up 1:1
// with where the features actually sit in the frame.
//   01 Säädettävä ohjaustanko → handlebar riser at the top of the unit
//   02 Sininen Trixx istuin   → green/yellow Trixx seat behind the bars
//   03 90 hv Rotax            → front bonnet over the engine
//   04 Kevyt runko            → hull side, around the Sea-Doo wordmark
const HOTSPOT_POSITIONS: Pick<Hotspot, "x" | "y" | "side" | "number">[] = [
  { x: 53, y: 51, side: "right", number: "01" },
  { x: 64, y: 56, side: "right", number: "02" },
  { x: 28, y: 62, side: "left", number: "03" },
  { x: 50, y: 70, side: "right", number: "04" },
];

export default function Anatomy() {
  const t = useT();
  const page = t.pages.vesijetti;
  const hotspots: Hotspot[] = HOTSPOT_POSITIONS.map((p, i) => ({
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
          {/* Real side-profile shot of our own Sea-Doo Spark Trixx
              (Seinäjoki). object-cover so the jet-ski fills the frame
              cleanly — no blurred-letterbox padding for the studio
              stock photo we used to ship here. */}
          <Image
            src={LOCAL_PHOTOS.ownSpark1}
            alt="Sea-Doo Spark Trixx 2up sivuprofiilista"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-secondary/10" />

          {/* Hotspots (desktop only — mobile gets a list below) */}
          <div className="hidden md:block absolute inset-0">
            {hotspots.map((h, i) => (
              <Hotspot key={i} hotspot={h} delay={i * 0.18} />
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

  // Three-beat entry, sequenced off the per-hotspot delay:
  //   1) the dot lands with a small spring (stiff, slightly damped)
  //   2) ~200 ms later the connector line draws out to the side
  //   3) ~250 ms after that the label fades + slides into place
  // Total per hotspot ≈ 0.7 s, with each card staggered 0.18 s after
  // the previous so the four points read as a wave instead of a pop.
  const dotDelay = delay;
  const lineDelay = delay + 0.2;
  const labelDelay = delay + 0.45;

  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Pulsing dot */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 18,
          delay: dotDelay,
        }}
        className="relative grid place-items-center"
      >
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-brand-primary animate-pulse-ring" />
        <span className="relative inline-flex h-5 w-5 rounded-full bg-brand-primary border-2 border-white shadow-soft" />
      </motion.span>

      {/* Connector line + label group */}
      <div
        className={`absolute top-1/2 ${
          isLeft ? "right-full mr-2" : "left-full ml-2"
        } -translate-y-1/2 flex items-center gap-2 ${
          isLeft ? "flex-row-reverse" : ""
        }`}
      >
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: lineDelay }}
          style={{ originX: isLeft ? 1 : 0 }}
          className="h-px w-12 bg-brand-primary"
        />
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 8 : -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: labelDelay }}
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
        </motion.div>
      </div>
    </div>
  );
}
