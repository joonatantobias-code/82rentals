"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useT } from "@/components/LocaleProvider";
import {
  getReviews,
  getRatingSummary,
  type Review,
} from "@/lib/reviews";

const PAGE_SIZE = 6;

// Google's standard avatar palette (the colours their default initial-
// avatars cycle through). We hash the initials so the same person gets
// the same colour on every render.
const AVATAR_COLORS = [
  "#1A73E8", // blue
  "#0F9D58", // green
  "#D93025", // red
  "#F4B400", // yellow
  "#A142F4", // purple
  "#00ACC1", // teal
  "#F76C5E", // coral
  "#34A853", // mint
];

function colorForReview(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function Reviews() {
  const t = useT();
  const all = getReviews();
  const summary = getRatingSummary();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const visibleReviews = all.slice(0, visible);
  const hasMore = visible < all.length;
  const remaining = all.length - visible;

  return (
    <section id="reviews" className="section relative">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -left-20" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 -right-20" />

      <span
        aria-hidden
        className="num82-outline hidden md:block absolute -top-4 right-4 font-display font-extrabold text-[8rem] leading-none tracking-tighter select-none pointer-events-none"
      >
        82
      </span>

      <div className="relative max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-6 md:mb-8">
          <span className="section-eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
        </div>

        {/* Google-styled summary card */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-soft p-5 md:p-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex items-center gap-4">
              <GoogleG size={36} />
              <div>
                <p className="font-semibold text-brand-secondary leading-tight">
                  Google-arvostelut
                </p>
                <p className="text-xs text-brand-secondary/60">
                  {all.length} arvostelua
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:ml-auto">
              <div className="text-center">
                <div className="font-display text-4xl font-extrabold text-brand-secondary leading-none">
                  {summary.average.toFixed(1)}
                </div>
                <Stars rating={Math.round(summary.average)} />
              </div>
              <a
                href="https://www.google.com/search?q=82rentals+helsinki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#1a73e8]/8 transition-colors"
              >
                {t.reviews.readGoogle}
              </a>
            </div>
          </div>

          {/* Distribution-style rating bars (Google shows these too). */}
          <div className="mt-5 hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1.5 max-w-md">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = all.filter((r) => r.rating === stars).length;
              const pct = (count / all.length) * 100;
              return (
                <RatingBar key={stars} stars={stars} pct={pct} count={count} />
              );
            })}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid lg:grid-cols-2 gap-3.5">
          {visibleReviews.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: Math.min(0.06 * (idx % PAGE_SIZE), 0.3),
              }}
            >
              <ReviewCard r={r} />
            </motion.div>
          ))}
        </div>

        {/* Load more — Google-blue text on light hover, like Google's UI. */}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisible((v) => Math.min(all.length, v + PAGE_SIZE))
              }
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#1a73e8] border border-black/10 bg-white hover:bg-[#1a73e8]/8 hover:border-[#1a73e8]/30 transition-colors"
            >
              Lataa lisää arvosteluita
              <span className="text-brand-secondary/55 font-normal">
                ({remaining})
              </span>
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const color = colorForReview(r.id);
  const [expanded, setExpanded] = useState(false);
  const SHORT_LIMIT = 220;
  const isLong = r.text.length > SHORT_LIMIT;
  const displayText =
    !isLong || expanded ? r.text : r.text.slice(0, SHORT_LIMIT).trim() + "…";

  return (
    <article className="rounded-xl border border-black/10 bg-white p-5 hover:border-black/20 transition-colors">
      <div className="flex items-start gap-3">
        {r.photoUrl ? (
          <img
            src={r.photoUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover shrink-0"
            loading="lazy"
          />
        ) : (
          <span
            className="h-10 w-10 rounded-full grid place-items-center text-white text-sm font-medium shrink-0"
            style={{ background: color }}
            aria-hidden
          >
            {r.initials}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-brand-secondary text-[15px] leading-tight">
              {r.author}
            </span>
            {r.isLocalGuide && (
              <span className="inline-flex items-center gap-1 text-[11px] text-brand-secondary/60">
                <LocalGuideMark />
                Local Guide
              </span>
            )}
          </div>
          {(r.reviewCount !== undefined || r.photoCount !== undefined) && (
            <p className="text-[12px] text-brand-secondary/55 mt-0.5">
              {r.reviewCount !== undefined && `${r.reviewCount} arvostelua`}
              {r.reviewCount !== undefined && r.photoCount !== undefined && " · "}
              {r.photoCount !== undefined && `${r.photoCount} kuvaa`}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Stars rating={r.rating} />
        <span className="text-[12px] text-brand-secondary/55">{r.date}</span>
      </div>

      <p className="text-[14px] text-brand-secondary/85 leading-relaxed mt-2.5 whitespace-pre-line">
        {displayText}
        {isLong && !expanded && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-[#1a73e8] font-medium hover:underline"
            >
              Lisää
            </button>
          </>
        )}
      </p>
    </article>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-[#FBBC04] text-[#FBBC04]"
              : "text-brand-secondary/15"
          }
        />
      ))}
    </div>
  );
}

function RatingBar({
  stars,
  pct,
  count,
}: {
  stars: number;
  pct: number;
  count: number;
}) {
  return (
    <>
      <span className="text-[12px] text-brand-secondary/65 tabular-nums">
        {stars}
      </span>
      <span className="self-center h-1.5 rounded-full bg-black/8 overflow-hidden">
        <span
          className="block h-full bg-[#FBBC04]"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="text-[12px] text-brand-secondary/55 tabular-nums text-right">
        {count}
      </span>
    </>
  );
}

function LocalGuideMark() {
  // Stylised pinned-mountain badge — Google's Local Guide icon shape.
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2 L20 18 L4 18 Z"
        fill="#1a73e8"
      />
      <circle cx="12" cy="9" r="1.7" fill="white" />
    </svg>
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
