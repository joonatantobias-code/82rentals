"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useT } from "@/components/LocaleProvider";
import { getReviews, type Review } from "@/lib/reviews";

// 8 reviews = 4 rows in the 2-column grid. Initial render shows 12
// (six rows) so the section feels populated; each "Lataa lisää" reveals
// 8 more.
const INITIAL_VISIBLE = 12;
const PAGE_SIZE = 8;

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
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const visibleReviews = all.slice(0, visible);
  const hasMore = visible < all.length;
  const remaining = all.length - visible;

  // No scroll compensation. Let the document grow naturally — the user
  // stays at exactly the same scroll position they were on, the new
  // cards mount below the current viewport, and they can scroll down to
  // browse them when they want. The previous implementation auto-scrolled
  // to keep the button under the cursor, which the user read as "the
  // page jumped down".
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

      <div className="relative max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-6 md:mb-8">
          <span className="section-eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
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

