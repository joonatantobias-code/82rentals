"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOCAL_PHOTOS, unsplashUrl } from "@/lib/images";
import BrushUnderline from "@/components/BrushUnderline";

const cards = [
  {
    href: "/vesijetti",
    eyebrow: "Kone",
    title: "90 hv adrenaliinia",
    text: "Spark Trixx on tehty huomiota varten. Kevyt, ketterä ja täysin ennustamaton.",
    photo: LOCAL_PHOTOS.coupleAction,
    overlay: "bg-brand-secondary/55",
  },
  {
    href: "/hinnasto",
    eyebrow: "Hinnasto",
    title: "Yksi hinta, kaikki mukana",
    text: "Toimitus, polttoaine, liivit ja vakuutus aina hintaan. Ei piilokuluja.",
    photo: LOCAL_PHOTOS.yellowRider,
    overlay: "bg-brand-secondary/55",
  },
  {
    href: "/meista",
    eyebrow: "Tiimi",
    title: "Helsinkiläiset tekijät",
    text: "Kolme kaveria, yksi missio: tehdä kesästäsi unohtumaton.",
    photo: unsplashUrl("helsinki1", { w: 1400 }),
    overlay: "bg-brand-secondary/55",
  },
];

export default function HomeHighlights() {
  return (
    <section className="section relative">
      <div className="blob-primary w-[300px] h-[300px] -top-20 right-0" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 -left-20" />

      <div className="relative max-w-3xl mb-10 md:mb-12">
        <span className="section-eyebrow">Mitä saat</span>
        <h2 className="section-title">
          Kesäsi{" "}
          <span className="relative inline-block text-brand-primary-600">
            kovin
            <BrushUnderline color="#0A3D62" delay={0.4} thickness={8} />
          </span>{" "}
          investointi.
        </h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          Vapaus, vauhti ja ne hetket joita ei voi ostaa muuten kuin tällä
          tavalla. Tutustu pakettiin tai hyppää suoraan varaukseen.
        </p>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={c.href}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/5] shadow-soft"
            >
              <Image
                src={c.photo}
                alt={c.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 ${c.overlay}`} />
              {/* Brand-color accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                  {c.eyebrow}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold mt-2 leading-tight">
                  {c.title}
                </h3>
                <p className="text-sm text-white/85 mt-2 max-w-xs">{c.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                  Lue lisää
                  <span className="h-9 w-9 rounded-full bg-brand-primary text-brand-secondary grid place-items-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
