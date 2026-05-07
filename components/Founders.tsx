"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

// Order matches the i18n dictionary: Joonatan, Patrik, Ville. The
// `photoPath` slot is intentionally null until real portrait photos
// are dropped in — when that happens, set photoPath to "/founders/<name>.jpg"
// and the placeholder block (initials on a brand-coloured tile)
// gets swapped for the actual <Image>.
const FOUNDER_META: {
  initials: string;
  email: string;
  bg: string;
  photoPath: string | null;
}[] = [
  {
    initials: "JL",
    email: "joonatan@82rentals.fi",
    bg: "bg-brand-primary",
    photoPath: null,
  },
  {
    initials: "PB",
    email: "patrik@82rentals.fi",
    bg: "bg-brand-turquoise",
    photoPath: null,
  },
  {
    initials: "VH",
    email: "ville@82rentals.fi",
    bg: "bg-brand-primary",
    photoPath: null,
  },
];

export default function Founders() {
  const t = useT();
  const page = t.pages.meista;
  const founders = FOUNDER_META.map((m, i) => ({
    ...m,
    name: page.founders[i].name,
    role: page.founders[i].role,
    bio: page.founders[i].bio,
  }));
  return (
    <section className="section relative">
      <div className="blob-primary w-[260px] h-[260px] -top-10 -right-20" />
      <div className="blob-turquoise w-[220px] h-[220px] bottom-0 -left-10" />

      <div className="relative max-w-3xl mb-10 md:mb-14">
        <span className="section-eyebrow">{page.foundersEyebrow}</span>
        <h2 className="section-title">{page.foundersTitle}</h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          {page.foundersBody}
        </p>
      </div>

      <div className="relative grid md:grid-cols-3 gap-5">
        {founders.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div
              className={`relative aspect-[3/4] ${f.photoPath ? "" : f.bg}`}
            >
              {f.photoPath ? (
                <Image
                  src={f.photoPath}
                  alt={f.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <span
                    className="font-display text-7xl font-extrabold text-brand-secondary/85 tracking-tighter"
                    aria-hidden
                  >
                    {f.initials}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-brand-secondary">
                {f.name}
              </h3>
              <p className="text-sm font-semibold text-brand-primary-600 mt-1">
                {f.role}
              </p>
              <p className="mt-3 text-sm text-brand-secondary/75 leading-relaxed">
                {f.bio}
              </p>
              <a
                href={`mailto:${f.email}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary/75 hover:text-brand-primary-600 transition-colors"
              >
                <Mail size={15} />
                {f.email}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
