"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

type Founder = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  email?: string;
  instagram?: string;
  bg: string;
};

const founders: Founder[] = [
  {
    name: "Patrik Blomvall",
    initials: "PB",
    role: "Perustaja",
    bio: "Helsinkiläinen vesi ja moottoriurheilun harrastaja, joka pyörittää 82Rentalsin operatiivista puolta. Vastaa kalustosta, toimituksista ja siitä, että jokainen ajo lähtee kunnolla käyntiin.",
    email: "patrik@82rentals.fi",
    bg: "bg-brand-primary",
  },
  {
    name: "Ville Hautamäki",
    initials: "VH",
    role: "Perustaja",
    bio: "Asiakaskokemus ja kasvun suunta ovat Villen vastuulla. Pitää huolen, että varaus sujuu mutkattomasti ja että asiakkaiden palaute kuuluu jokaisessa palvelun yksityiskohdassa.",
    email: "ville@82rentals.fi",
    bg: "bg-brand-turquoise",
  },
  {
    name: "Joonatan Lindholm",
    initials: "JL",
    role: "Perustaja",
    bio: "Brändin ja digitaalisen kokonaisuuden takana. Verkkokokemus, sisältö ja ulkoasu ovat Joonatanin tontilla, jotta sivu näyttää yhtä terävältä kuin itse Spark Trixx vesillä.",
    email: "joonatan@82rentals.fi",
    bg: "bg-brand-primary",
  },
];

export default function Founders() {
  return (
    <section className="section relative">
      <div className="blob-primary w-[260px] h-[260px] -top-10 -right-20" />
      <div className="blob-turquoise w-[220px] h-[220px] bottom-0 -left-10" />

      <div className="relative max-w-3xl mb-10 md:mb-14">
        <span className="section-eyebrow">Tiimi</span>
        <h2 className="section-title">Kolme tyyppiä, yksi vesijetti.</h2>
        <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
          Helsinkiläinen kolmikko, joka uskoo että parhaat kesäpäivät syntyvät
          vesillä. Perustimme 82Rentalsin tehdäksemme jetskeilystä yhtä
          helppoa kuin pizzan tilaaminen.
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
            {(f.email || f.instagram) && (
              <div className="mt-5 flex items-center gap-2">
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="h-9 w-9 rounded-lg bg-brand-primary-50 text-brand-secondary grid place-items-center hover:bg-brand-primary transition-colors"
                    aria-label={`Lähetä sähköpostia ${f.name}`}
                  >
                    <Mail size={15} />
                  </a>
                )}
                {f.instagram && (
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg bg-brand-primary-50 text-brand-secondary grid place-items-center hover:bg-brand-primary transition-colors"
                    aria-label={`${f.name} Instagram`}
                  >
                    <Instagram size={15} />
                  </a>
                )}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
