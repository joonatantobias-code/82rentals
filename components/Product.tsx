"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Users,
  Sparkles,
  Shield,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { LOCAL_PHOTOS } from "@/lib/images";
import { useT } from "@/components/LocaleProvider";

// Four hand-picked photos of our own Sea-Doo Spark Trixx, each from
// a different angle so no two thumbnails read as the "same shot".
// Side profile leads — it's the cleanest "this is what you're
// renting" hero — followed by the front 3/4, rear 3/4 detail, and
// top-down on the cockpit.
const gallery = [
  LOCAL_PHOTOS.ownSpark1,
  LOCAL_PHOTOS.ownSpark4,
  LOCAL_PHOTOS.ownSpark5,
  LOCAL_PHOTOS.ownSpark6,
];

type FeatureVisual = {
  icon: LucideIcon;
  color: string;
  textColor: string;
  accentHex: string;
  iconRotate: number;
};

const FEATURE_VISUALS: FeatureVisual[] = [
  {
    icon: Gauge,
    color: "bg-brand-primary",
    textColor: "text-brand-secondary",
    accentHex: "#6EC6FF",
    iconRotate: 12,
  },
  {
    icon: Sparkles,
    color: "bg-brand-turquoise",
    textColor: "text-brand-secondary",
    accentHex: "#1DD3B0",
    iconRotate: -12,
  },
  {
    icon: Users,
    color: "bg-brand-secondary",
    textColor: "text-white",
    accentHex: "#0A3D62",
    iconRotate: 8,
  },
  {
    icon: Shield,
    color: "bg-brand-primary",
    textColor: "text-brand-secondary",
    accentHex: "#6EC6FF",
    iconRotate: -8,
  },
];

export default function Product() {
  const t = useT();
  const page = t.pages.vesijetti;
  const features = FEATURE_VISUALS.map((v, i) => ({
    ...v,
    title: page.features[i].title,
    text: page.features[i].text,
  }));
  const [active, setActive] = useState(0);

  // Auto-advance the gallery every 5 s. The timeout is rebound on every
  // `active` change so a manual thumbnail click effectively resets the
  // 5-second window, giving the user a full beat on the photo they just
  // chose before the slideshow continues.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <section
      id="product"
      className="relative px-5 sm:px-8 pt-6 md:pt-10 lg:pt-14 pb-16 md:pb-24 lg:pb-28 max-w-7xl mx-auto"
    >
      <div className="blob-primary w-[360px] h-[360px] -top-10 -left-32" />
      <div className="blob-turquoise w-[280px] h-[280px] bottom-10 -right-32" />

      {/* The Product section sits directly under PageHero, so on most
          screens it's already in view at first paint. Driving these
          two columns straight from `animate` (instead of whileInView)
          makes the image and text fade/slide into place on mount —
          without that, the user would land on the page, see the text
          column already visible (intersection had it firing during
          hydration), and the photo wouldn't animate until they
          scrolled. */}
      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cleaner edges: aspect bumped to 5:4 so the photos breathe,
              ring border anchors the frame, and the photos themselves
              use object-cover so there are no letterbox bars. The old
              decorative spinning dotted ring + "Suosituin" sticker were
              fighting the photography for attention; both are gone. */}
          <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden shadow-soft bg-brand-primary-50 ring-1 ring-black/5">
            {gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt="Sea-Doo Spark Trixx vesijetti"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            ))}
            {/* Soft inner border so the photo never bleeds visually
                past the rounded corner. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  active === i
                    ? "border-brand-primary shadow-soft scale-[0.97]"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
                aria-label={`${t.common.readMore} ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span className="section-eyebrow">{page.productEyebrow}</span>
          <h2 className="section-title">{page.productTitle}</h2>
          <p className="mt-5 text-base sm:text-lg text-brand-secondary/75 leading-relaxed">
            {page.productBody}
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="feature-card"
                style={
                  {
                    "--feat-color": f.accentHex,
                    "--feat-rotate": `${f.iconRotate}deg`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={`feat-icon h-11 w-11 rounded-xl ${f.color} ${f.textColor} grid place-items-center`}
                >
                  <f.icon size={20} />
                </div>
                <h4 className="font-display font-semibold text-brand-secondary mt-4 relative">
                  {f.title}
                </h4>
                <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed relative">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>

          <Link href="/varaa" className="btn-primary mt-8">
            {page.productCta} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
