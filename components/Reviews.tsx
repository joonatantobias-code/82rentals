"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Placeholder reviews. Replace with real Google reviews via the Places API
// later. The shape mimics the Google review object so the swap is trivial.
type Review = {
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  color: string;
};

const reviews: Review[] = [
  {
    author: "Mikko T.",
    initials: "MT",
    rating: 5,
    date: "Heinäkuu 2025",
    text: "Toimitus pelasi täydellisesti. Saimme Spark Trixxin suoraan mökin laiturille ja loppupäivä meni kuin siivillä. Suosittelen.",
    color: "bg-brand-primary",
  },
  {
    author: "Anna K.",
    initials: "AK",
    rating: 5,
    date: "Elokuu 2025",
    text: "Helpoin varauskokemus. Tunti meni nopeasti, joten varasin saman tien lisää. Asiakaspalvelu rentoa ja ammattimaista.",
    color: "bg-brand-turquoise",
  },
  {
    author: "Petra L.",
    initials: "PL",
    rating: 5,
    date: "Heinäkuu 2025",
    text: "Loistava synttärilahja kaverille. Kaverit yllättyivät täysin kun jetti tuotiin paikan päälle. Varmasti tulemme uudestaan.",
    color: "bg-brand-primary",
  },
  {
    author: "Joonas R.",
    initials: "JR",
    rating: 5,
    date: "Kesäkuu 2025",
    text: "Spark Trixx on hauska peli. Lyhyt opastus riitti täysin, hommat sujui muuten ihan itsestään. Vakuutus ja liivit oli ok kunnossa.",
    color: "bg-brand-turquoise",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section relative">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -left-20" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 -right-20" />

      {/* Outlined 82 — subtle */}
      <span
        aria-hidden
        className="num82-outline hidden md:block absolute -top-4 right-4 font-display font-extrabold text-[8rem] leading-none tracking-tighter select-none pointer-events-none"
      >
        82
      </span>

      <div className="relative grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-14 items-end mb-10 md:mb-12">
        <div>
          <span className="section-eyebrow">Arvostelut</span>
          <h2 className="section-title">Asiakkaat kertovat.</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:justify-end">
          <div className="flex items-center gap-3">
            <div className="font-display text-5xl font-extrabold text-brand-secondary leading-none">
              4,9
            </div>
            <div>
              <Stars rating={5} />
              <p className="text-xs text-brand-secondary/60 mt-1">
                Yhteensä 47 Google arvostelua
              </p>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=82rentals+helsinki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-brand-primary/30 text-brand-secondary font-semibold text-sm hover:border-brand-primary transition-colors"
          >
            <GoogleG />
            Lue Googlessa
          </a>
        </div>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {reviews.map((r, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="card p-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-11 w-11 rounded-full ${r.color} text-brand-secondary grid place-items-center font-display font-extrabold`}
                aria-hidden
              >
                {r.initials}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-brand-secondary truncate">
                  {r.author}
                </p>
                <p className="text-xs text-brand-secondary/55">{r.date}</p>
              </div>
              <span className="ml-auto">
                <GoogleG size={18} />
              </span>
            </div>
            <Stars rating={r.rating} className="mt-4" />
            <p className="text-sm text-brand-secondary/80 leading-relaxed mt-3 flex-1">
              “{r.text}”
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Stars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-brand-primary text-brand-primary"
              : "text-brand-secondary/20"
          }
        />
      ))}
    </div>
  );
}

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#EA4335"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
