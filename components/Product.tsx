"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

const gallery = [
  LOCAL_PHOTOS.blue1,
  LOCAL_PHOTOS.blueSide,
  LOCAL_PHOTOS.blue2,
  LOCAL_PHOTOS.coupleAction,
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

  return (
    <section id="product" className="section relative">
      <div className="blob-primary w-[360px] h-[360px] -top-10 -left-32" />
      <div className="blob-turquoise w-[280px] h-[280px] bottom-10 -right-32" />

      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-soft bg-brand-primary-50">
            {/* Decorative dotted backdrop ring (SVG) */}
            <div className="absolute -top-4 -right-4 w-28 h-28 z-10 pointer-events-none animate-spin-slow opacity-70">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#6EC6FF"
                  strokeWidth="2"
                  strokeDasharray="2 4"
                  fill="none"
                />
              </svg>
            </div>

            {gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Blurred copy fills the frame edges */}
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover scale-125 blur-2xl opacity-70"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-brand-primary-50/30" />
                {/* Sharp foreground product shot */}
                <Image
                  src={src}
                  alt="Sea-Doo Spark Trixx vesijetti"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="relative object-contain p-1 md:p-2"
                  priority={i === 0}
                />
              </motion.div>
            ))}
            <span className="sticker absolute top-4 left-4">
              <Sparkles size={12} />
              Suosituin
            </span>
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
        </div>

        <div>
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
                {/* Top corner accent bar — slides in on hover */}
                <span className="feat-corner" aria-hidden />

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
        </div>
      </div>
    </section>
  );
}
