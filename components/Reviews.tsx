"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useT } from "@/components/LocaleProvider";
import { getReviews, getRatingSummary, type Review } from "@/lib/reviews";

const INITIAL_VISIBLE = 12;
const PAGE_SIZE = 8;

// Avatar palette mirroring the colours Google's review widget uses for
// initial-avatars. Hashed by the review id so each reviewer keeps the
// same colour every render.
const AVATAR_COLORS = [
  "#7B5CD6", // purple
  "#0F9D58", // green
  "#D93025", // red
  "#F4B400", // yellow
  "#1A73E8", // blue
  "#00ACC1", // teal
  "#F76C5E", // coral
  "#34A853", // mint
  "#5E6F89", // slate
  "#E91E63", // pink
];

function colorForReview(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function firstLetter(name: string): string {
  return (name.trim()[0] || "?").toUpperCase();
}

export default function Reviews() {
  const t = useT();
  const all = getReviews();
  const summary = getRatingSummary();
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const visibleReviews = all.slice(0, visible);
  const hasMore = visible < all.length;
  const remaining = all.length - visible;

  function loadMore() {
    setVisible((v) => Math.min(all.length, v + PAGE_SIZE));
  }

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

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <span className="section-eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
        </div>

        {/* Google-styled summary header — full Google wordmark, plain
            "Erinomainen" descriptor, gold stars + average + total, and
            a "Kirjoita oma arviosi" pill on the right. Built from the
            reference shot so the section reads as a real Google reviews
            widget, not a custom card. */}
        <div className="rounded-2xl bg-zinc-100 p-4 md:p-5 mb-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-wrap">
          <GoogleWordmark />
          <span className="text-[15px] font-medium text-zinc-800">Erinomainen</span>
          <div className="flex items-center gap-2 text-[15px] font-medium text-zinc-800">
            <Stars rating={Math.round(summary.average)} size={16} />
            <span>
              {summary.average.toFixed(1)}{" "}
              <span className="text-zinc-400">|</span>{" "}
              {all.length} arvostelut
            </span>
          </div>
          <a
            href="https://www.google.com/search?q=82rentals+helsinki"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto rounded-full bg-white px-4 py-2 text-sm font-semibold border border-zinc-200 hover:border-zinc-300 transition-colors text-zinc-900"
          >
            Kirjoita oma arviosi
          </a>
        </div>

        {/* Masonry wall, JS round-robin into 4 columns. We deliberately
            don't use CSS multi-column here — that layout rebalances when
            items are added, so clicking "Lataa lisää" would shift cards
            between columns and the page jumped under the user's eye.
            Round-robin distribution into per-column flex stacks means
            new cards always *append* to the end of their column; nothing
            already on screen moves. The page just grows downward and the
            button slides under the new rows. */}
        <ReviewWall reviews={visibleReviews} pageSize={PAGE_SIZE} />

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
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

function ReviewWall({
  reviews,
  pageSize,
}: {
  reviews: Review[];
  pageSize: number;
}) {
  // Round-robin into four columns. Index 0,4,8,… → column 0; index 1,5,9,…
  // → column 1; etc. New reviews always append to the end of their
  // column, so every card already on screen keeps its exact position
  // when the user clicks "Lataa lisää".
  const cols: Review[][] = [[], [], [], []];
  reviews.forEach((r, i) => {
    cols[i % 4].push(r);
  });
  // Mobile (< sm): collapse to a single column. We still use the round-
  // robin output so identity stays stable, just rendered as a flat
  // stack inside one column wrapper.
  return (
    <>
      {/* Desktop / tablet: real columns side by side. */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3.5">
            {col.map((r, idx) => (
              <ReviewCardMotion
                key={r.id}
                r={r}
                idx={idx}
                pageSize={pageSize}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Mobile: simple stack. */}
      <div className="sm:hidden flex flex-col gap-3.5">
        {reviews.map((r, idx) => (
          <ReviewCardMotion
            key={r.id}
            r={r}
            idx={idx}
            pageSize={pageSize}
          />
        ))}
      </div>
    </>
  );
}

function ReviewCardMotion({
  r,
  idx,
  pageSize,
}: {
  r: Review;
  idx: number;
  pageSize: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        delay: Math.min(0.03 * (idx % pageSize), 0.2),
      }}
    >
      <ReviewCard r={r} />
    </motion.div>
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
    <article className="relative rounded-2xl bg-zinc-100 p-5">
      {/* Card-corner Google G mark, like Google's own review widget. */}
      <span aria-hidden className="absolute top-4 right-4">
        <GoogleGCircle size={20} />
      </span>

      <div className="flex items-start gap-3">
        {r.photoUrl ? (
          <img
            src={r.photoUrl}
            alt=""
            className="h-11 w-11 rounded-full object-cover shrink-0"
            loading="lazy"
          />
        ) : (
          <span
            className="h-11 w-11 rounded-full grid place-items-center text-white text-[18px] font-medium shrink-0"
            style={{ background: color }}
            aria-hidden
          >
            {firstLetter(r.author)}
          </span>
        )}
        <div className="flex-1 min-w-0 pr-7">
          <p className="font-semibold text-zinc-900 text-[15px] leading-tight truncate">
            {r.author}
          </p>
          <p className="text-[13px] text-zinc-500 mt-0.5">{r.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <Stars rating={r.rating} size={15} />
        <VerifiedTick />
      </div>

      <p className="text-[14px] text-zinc-800 mt-3 leading-relaxed whitespace-pre-line">
        {displayText}
        {isLong && !expanded && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-zinc-500 font-medium hover:underline"
            >
              Lue lisää
            </button>
          </>
        )}
      </p>
    </article>
  );
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-[#FBBC04] text-[#FBBC04]"
              : "fill-zinc-300 text-zinc-300"
          }
        />
      ))}
    </div>
  );
}

function VerifiedTick() {
  return (
    <span
      className="inline-flex h-3.5 w-3.5 rounded-full bg-[#1a73e8] items-center justify-center"
      aria-hidden
    >
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.5 L5 9 L9.5 3.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function GoogleWordmark() {
  // Hand-rolled "Google" wordmark in the brand colours. Sticking with
  // a system sans rendering keeps it crisp without bundling a font.
  return (
    <span
      className="text-[28px] font-medium leading-none tracking-tight"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      aria-label="Google"
    >
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

function GoogleGCircle({ size = 18 }: { size?: number }) {
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
