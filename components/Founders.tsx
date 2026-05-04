"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

const FOUNDER_META = [
  { initials: "PB", email: "patrik@82rentals.fi", bg: "bg-brand-primary" },
  { initials: "VH", email: "ville@82rentals.fi", bg: "bg-brand-turquoise" },
  { initials: "JL", email: "joonatan@82rentals.fi", bg: "bg-brand-primary" },
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
            className="card p-6 sm:p-7 hover:-translate-y-1 transition-transform"
          >
            <div
              className={`h-20 w-20 rounded-2xl ${f.bg} text-brand-secondary grid place-items-center font-display text-3xl font-extrabold`}
              aria-hidden
            >
              {f.initials}
            </div>
            <h3 className="font-display text-xl font-bold text-brand-secondary mt-5">
              {f.name}
            </h3>
            <p className="text-sm font-semibold text-brand-primary-600 mt-1">
              {f.role}
            </p>
            <p className="mt-3 text-sm text-brand-secondary/75 leading-relaxed">
              {f.bio}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={`mailto:${f.email}`}
                className="h-9 w-9 rounded-lg bg-brand-primary-50 text-brand-secondary grid place-items-center hover:bg-brand-primary transition-colors"
                aria-label={`${t.common.email} – ${f.name}`}
              >
                <Mail size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
