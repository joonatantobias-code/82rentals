"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

// Order matches the i18n dictionary: Joonatan, Patrik, Ville. Each
// card surfaces a phone number instead of a personal email — Patrik
// answers the customer-service line (also the brand main number),
// Joonan + Ville share their own mobiles. The `photoPath` slot stays
// null until real portraits ship; in the meantime the initials tile
// fills the photo well. Setting `phone` to null falls back to the
// customer-service number so every card still has a working click.
const CUSTOMER_SERVICE_PHONE = "+358 40 186 6664";
const CUSTOMER_SERVICE_TEL = "tel:+358401866664";

type FounderMeta = {
  initials: string;
  phone: string | null;
  phoneHref: string | null;
  bg: string;
  photoPath: string | null;
};

const FOUNDER_META: FounderMeta[] = [
  {
    // Joonatan — direct mobile is the same as on the Helsingin
    // Ikkunanpesijät site. Replace these two values once the URL
    // is provided.
    initials: "JL",
    phone: null,
    phoneHref: null,
    bg: "bg-brand-primary",
    photoPath: null,
  },
  {
    // Patrik runs operations + customer service, so his card just
    // points at the main customer-service line (no separate
    // personal number).
    initials: "PB",
    phone: CUSTOMER_SERVICE_PHONE,
    phoneHref: CUSTOMER_SERVICE_TEL,
    bg: "bg-brand-turquoise",
    photoPath: null,
  },
  {
    // Ville — same source as Joonatan (Helsingin Ikkunanpesijät).
    initials: "VH",
    phone: null,
    phoneHref: null,
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
        {founders.map((f, i) => {
          const phoneLabel = f.phone ?? CUSTOMER_SERVICE_PHONE;
          const phoneHref = f.phoneHref ?? CUSTOMER_SERVICE_TEL;
          return (
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
                  href={phoneHref}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary/75 hover:text-brand-primary-600 transition-colors"
                >
                  <Phone size={15} />
                  {phoneLabel}
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
