"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
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

  function loadMore(e: React.MouseEvent<HTMLButtonElement>) {
    // Hard scroll lock with multiple fences. The previous fix worked
    // when the button was in the middle of the viewport but failed
    // when it was at the top, because the browser's focus-and-scroll
    // heuristic can fire on the next frame after our restore. Now we:
    //   1. snapshot scroll
    //   2. blur the button
    //   3. flushSync the state update
    //   4. snap scroll back synchronously
    //   5. snap again on the next two animation frames in case any
    //      browser auto-scroll fires after our task
    const lockY = window.scrollY;
    const lockX = window.scrollX;
    e.currentTarget.blur();
    flushSync(() => {
      setVisible((v) => Math.min(all.length, v + PAGE_SIZE));
    });
    if (window.scrollY !== lockY || window.scrollX !== lockX) {
      window.scrollTo(lockX, lockY);
    }
    requestAnimationFrame(() => {
      if (window.scrollY !== lockY || window.scrollX !== lockX) {
        window.scrollTo(lockX, lockY);
      }
      requestAnimationFrame(() => {
        if (window.scrollY !== lockY || window.scrollX !== lockX) {
          window.scrollTo(lockX, lockY);
        }
      });
    });
  }

  return (
    <section
      id="reviews"
      className="section relative"
      // overflow-anchor: none stops the browser from re-anchoring its
      // scroll position when items mount inside the section. With it
      // on, adding cards below was nudging the viewport down to keep
      // an "anchor element" visible — that's what the user saw as
      // the page scrolling under their cursor.
      style={{ overflowAnchor: "none" }}
    >
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
        <ReviewWall reviews={visibleReviews} />

        {hasMore && (
          <div
            className="mt-6 flex justify-center"
            style={{ overflowAnchor: "none" }}
          >
            <button
              type="button"
              // preventDefault on mousedown blocks the browser from
              // focusing the button at click time. The browser's
              // "scroll focused element into view" was triggering an
              // upward scroll when the button sat at the very top of
              // the viewport, which my flushSync restore couldn't
              // always beat.
              onMouseDown={(e) => e.preventDefault()}
              onClick={loadMore}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#1a73e8] border border-black/10 bg-white hover:bg-[#1a73e8]/8 hover:border-[#1a73e8]/30 transition-colors"
              style={{ overflowAnchor: "none" }}
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

function ReviewWall({ reviews }: { reviews: Review[] }) {
  // Round-robin into four columns. New reviews append to the end of
  // their column; nothing already on screen ever moves. No mount
  // animation either — cards appear in their final position, so the
  // wall doesn't grow visibly while it loads.
  const cols: Review[][] = [[], [], [], []];
  reviews.forEach((r, i) => {
    cols[i % 4].push(r);
  });
  return (
    <>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3.5">
            {col.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>
        ))}
      </div>
      <div className="sm:hidden flex flex-col gap-3.5">
        {reviews.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>
    </>
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
    <article className="relative rounded-2xl bg-zinc-100 p-5 shadow-[0_2px_6px_rgba(15,23,42,0.06),0_18px_40px_-12px_rgba(15,23,42,0.18)]">
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
  // Inline SVG of the official Google wordmark. Letter glyphs are the
  // standard paths (visual order in the SVG: first o, second o, g, l,
  // e, capital G); each `fill` is the Google brand colour for THAT
  // glyph in the printed wordmark — G blue, o red, o yellow, g blue,
  // l green, e red.
  return (
    <svg
      role="img"
      aria-label="Google"
      width="92"
      height="30"
      viewBox="0 0 272 92"
      className="block"
    >
      {/* first o → red */}
      <path
        fill="#EA4335"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      {/* second o → yellow */}
      <path
        fill="#FBBC04"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      {/* g → blue */}
      <path
        fill="#4285F4"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
      />
      {/* l → green */}
      <path
        fill="#34A853"
        d="M225 3v65h-9.5V3h9.5z"
      />
      {/* e → red */}
      <path
        fill="#EA4335"
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
      />
      {/* G → blue */}
      <path
        fill="#4285F4"
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
      />
    </svg>
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
