"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  MoreHorizontal,
  Play,
} from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";
import { getReels, type Platform, type Reel } from "@/lib/socialFeed";

function TikTokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

const SLIDE_DURATION = 850;
// Phase A (the leaving card sliding off the left edge) now matches the
// regular slide duration and easing, so it travels at the same pace as
// the rest of the carousel — no card looks faster than its neighbours.
const PHASE_A_DURATION = SLIDE_DURATION;
const FILTER_FADE_MS = 220;

export default function SocialFeed() {
  const t = useT();
  const [filter, setFilter] = useState<Platform>("tiktok");
  // Decoupled from `filter` so we can fade the carousel out, then swap the
  // rendered list, then fade back in — instead of remounting abruptly
  // when the user toggles between TikTok and Instagram.
  const [renderedFilter, setRenderedFilter] = useState<Platform>("tiktok");
  const [feedOpacity, setFeedOpacity] = useState(1);
  const [centerIndex, setCenterIndex] = useState(0);

  const reels = useMemo(() => getReels(), []);
  const filtered = useMemo(
    () => reels.filter((r) => r.platform === renderedFilter),
    [reels, renderedFilter]
  );

  function changeFilter(next: Platform) {
    if (next === filter) return;
    setFilter(next);
    // Fade current set out, swap, fade back in.
    setFeedOpacity(0);
    window.setTimeout(() => {
      setRenderedFilter(next);
      setCenterIndex(0);
      setFeedOpacity(1);
    }, FILTER_FADE_MS);
  }

  // Auto-advance every 3 s. Resets on manual click via centerIndex dep.
  useEffect(() => {
    if (filtered.length === 0) return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % filtered.length);
    }, 3000);
    return () => clearInterval(id);
  }, [filtered.length, centerIndex]);

  function handleCardClick(index: number, postUrl: string) {
    if (index === centerIndex) {
      window.open(postUrl, "_blank", "noopener,noreferrer");
    } else {
      setCenterIndex(index);
    }
  }

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevOffsetsRef = useRef<Map<number, number>>(new Map());

  function computeOffset(index: number, len: number, ci: number) {
    let offset = index - ci;
    if (offset > len / 2) offset -= len;
    if (offset <= -len / 2) offset += len;
    return offset;
  }

  function getCardStyle(index: number): React.CSSProperties {
    const len = filtered.length;
    if (len === 0) return { display: "none" };
    const offset = computeOffset(index, len, centerIndex);
    const abs = Math.abs(offset);

    const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.66 : 0.5;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.92 : abs === 2 ? 0.6 : 0.22;

    return {
      transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--carousel-step))) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
      filter: abs === 0 ? "none" : `saturate(${1 - abs * 0.12})`,
      transition: `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease`,
    };
  }

  // Three-phase wrap orchestration. See previous commits for details.
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useLayoutEffect(() => {
    const len = filtered.length;
    if (len === 0) return;
    filtered.forEach((_, i) => {
      const off = computeOffset(i, len, centerIndex);
      const prev = prevOffsetsRef.current.get(i);
      if (prev !== undefined && Math.abs(off - prev) > 4) {
        const el = cardRefs.current[i];
        if (el) {
          const targetTransform = el.style.transform;
          const targetTransition = el.style.transition;
          const targetOpacity = el.style.opacity;
          const targetFilter = el.style.filter;

          const leavingDir = prev < 0 ? -1 : 1;
          const phaseAOff = leavingDir * 4;
          const phaseBOff = -leavingDir * 4;

          el.style.transition = `transform ${PHASE_A_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${PHASE_A_DURATION}ms ease, filter 0.4s ease`;
          el.style.transform = `translate(-50%, -50%) translateX(calc(${phaseAOff} * var(--carousel-step))) scale(0.45)`;
          el.style.opacity = "0";
          el.style.filter = "saturate(0.4)";

          const pending = timersRef.current.get(i);
          if (pending) clearTimeout(pending);

          const tid = setTimeout(() => {
            const node = cardRefs.current[i];
            if (!node) return;
            node.style.transition = "none";
            node.style.transform = `translate(-50%, -50%) translateX(calc(${phaseBOff} * var(--carousel-step))) scale(0.45)`;
            node.style.opacity = "0";
            void node.offsetHeight;
            node.style.transition = targetTransition;
            node.style.transform = targetTransform;
            node.style.opacity = targetOpacity;
            node.style.filter = targetFilter;
            timersRef.current.delete(i);
          }, PHASE_A_DURATION);
          timersRef.current.set(i, tid);
        }
      }
      prevOffsetsRef.current.set(i, off);
    });
  }, [centerIndex, filtered]);

  useEffect(() => {
    prevOffsetsRef.current.clear();
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current.clear();
  }, [renderedFilter]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -left-20" />
      <div className="blob-turquoise w-[220px] h-[220px] bottom-10 -right-10" />

      <span
        aria-hidden
        className="num82-outline hidden md:block absolute right-4 top-2 font-display font-extrabold text-[6rem] leading-none select-none pointer-events-none tracking-tighter"
      >
        82
      </span>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-8 md:mb-10">
          <div>
            <span className="section-eyebrow">{t.socialFeed.eyebrow}</span>
            <h2 className="section-title">
              {t.socialFeed.titleA}{" "}
              <span className="relative inline-block">
                {t.socialFeed.titleHighlight}
                <BrushUnderline variant="spray" delay={0.4} duration={1.1} thickness={9} />
              </span>
              {t.socialFeed.titleB}
            </h2>
            <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg max-w-xl">
              {t.socialFeed.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <FilterButton
              active={filter === "tiktok"}
              onClick={() => changeFilter("tiktok")}
              icon={<TikTokGlyph size={14} />}
              accent="tiktok"
            >
              TikTok
            </FilterButton>
            <FilterButton
              active={filter === "instagram"}
              onClick={() => changeFilter("instagram")}
              icon={<Instagram size={14} />}
              accent="instagram"
            >
              Instagram
            </FilterButton>
          </div>
        </div>
      </div>

      <div
        key={renderedFilter}
        className="relative w-full mx-auto select-none"
        style={
          {
            "--carousel-step": "clamp(70px, 10vw, 130px)",
            height: "clamp(380px, 62vw, 500px)",
            opacity: feedOpacity,
            transition: `opacity ${FILTER_FADE_MS}ms ease`,
          } as React.CSSProperties
        }
      >
        {filtered.map((r, i) => {
          const style = getCardStyle(i);
          const isCenter = i === centerIndex;
          return (
            <button
              type="button"
              key={`${renderedFilter}-${r.id}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => handleCardClick(i, r.postUrl)}
              aria-label={
                isCenter
                  ? `Avaa ${r.platform === "tiktok" ? "TikTokissa" : "Instagramissa"}`
                  : `Siirrä keskelle: ${r.caption}`
              }
              style={{ position: "absolute", left: "50%", top: "50%", ...style }}
              className={`group/card w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-black will-change-transform ${
                isCenter ? "shadow-glow" : ""
              }`}
            >
              <video
                src={r.videoUrl}
                poster={r.posterUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {r.platform === "tiktok" ? (
                <TikTokOverlay reel={r} isCenter={isCenter} />
              ) : (
                <ReelsOverlay reel={r} />
              )}

              {isCenter && (
                <span className="absolute inset-0 grid place-items-center pointer-events-none">
                  <span className="h-12 w-12 rounded-full bg-white/90 grid place-items-center text-black opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Play size={18} className="fill-black translate-x-0.5" />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-1.5">
        {filtered.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCenterIndex(i)}
            aria-label={`Siirry videoon ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === centerIndex
                ? "w-6 bg-brand-secondary"
                : "w-2 bg-brand-secondary/25 hover:bg-brand-secondary/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* TikTok-style overlay. No brand handle in the centre — the section's
 * heading and the section's eyebrow already say where this content lives.
 * The overlay just gives the post the look users expect from TikTok.    */
function TikTokOverlay({ reel, isCenter }: { reel: Reel; isCenter: boolean }) {
  return (
    <>
      {/* Subtle scrim, no dark mid-band — the previous build read as a
          horizontal "bar" between the engagement icons and the foreground
          card. Now it's a soft gradient that just keeps text readable. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

      {/* Top: For You / Following style header */}
      <div className="absolute top-2 left-0 right-0 flex justify-center text-white text-[11px] font-bold tracking-wide">
        <span className="opacity-90">For You</span>
      </div>
      <div className="absolute top-2 right-2 text-white/90">
        <TikTokGlyph size={14} />
      </div>

      {/* Right rail with real engagement counts from the data layer. */}
      <div className="absolute right-1.5 bottom-14 flex flex-col items-center gap-3 text-white pointer-events-none">
        <RailIcon icon={<Heart size={16} className="fill-white" />} label={reel.likes} />
        <RailIcon icon={<MessageCircle size={16} />} label={reel.comments} />
        <RailIcon icon={<Send size={16} className="-rotate-12" />} label={reel.shares} />
      </div>

      {/* Bottom: caption + audio attribution. No @handle. */}
      <div className="absolute left-2.5 right-12 bottom-2 text-white">
        <p className="text-[10.5px] font-medium leading-snug line-clamp-2">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium opacity-90">
          <Music2 size={10} />
          <span className="truncate">{reel.audioLabel}</span>
        </div>
      </div>

      <div
        className={`absolute bottom-2 right-2 h-7 w-7 rounded-full bg-gradient-to-br from-zinc-700 to-black ring-1 ring-white/30 grid place-items-center pointer-events-none ${
          isCenter ? "tiktok-disc-spin" : ""
        }`}
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-white/40" />
      </div>
    </>
  );
}

function RailIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Bare icon (no dark pill behind it). The pill stack used to read
          as a vertical dark "bar" along the right edge of the card. */}
      <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {icon}
      </span>
      <span className="text-[9px] font-bold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {label}
      </span>
    </div>
  );
}

/* Instagram Reels-style overlay. No avatar / handle / "Seuraa" link —
 * keep the chrome to icons + caption + audio chip only.              */
function ReelsOverlay({ reel }: { reel: Reel }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

      <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-white">
        <span className="text-[11px] font-extrabold italic tracking-wide drop-shadow">
          Reels
        </span>
        <Instagram size={14} className="opacity-90" />
      </div>

      <div className="absolute right-2 bottom-14 flex flex-col items-center gap-3.5 text-white pointer-events-none">
        <RailIconReels icon={<Heart size={18} />} label={reel.likes} />
        <RailIconReels icon={<MessageCircle size={18} />} label={reel.comments} />
        <RailIconReels icon={<Send size={18} className="-rotate-12" />} label={reel.shares} />
        <RailIconReels icon={<Bookmark size={18} />} />
        <span className="text-white/95">
          <MoreHorizontal size={18} />
        </span>
      </div>

      <div className="absolute left-2.5 right-12 bottom-2 text-white">
        <p className="text-[10.5px] font-medium leading-snug line-clamp-2">
          {reel.caption}
        </p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[9.5px] font-semibold">
          <span className="block h-3 w-3 rounded-sm bg-gradient-to-br from-brand-primary to-brand-turquoise" />
          <span className="truncate max-w-[120px]">{reel.audioLabel}</span>
        </div>
      </div>
    </>
  );
}

function RailIconReels({ icon, label }: { icon: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {icon}
      </span>
      {label && (
        <span className="text-[9px] font-bold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {label}
        </span>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  accent,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  accent: "tiktok" | "instagram";
  children: React.ReactNode;
}) {
  // Inactive: white card with subtle brand-primary border.
  // Active TikTok: solid black (TikTok's home colour).
  // Active Instagram: full-bleed Instagram brand gradient. Wrapped in a
  // 2px transparent border + matching bg-clip so the gradient fills the
  // whole pill — no light hairline at the rounded edges.
  const base =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] border-2";
  if (!active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} bg-white text-brand-secondary border-brand-primary/30 hover:border-brand-primary`}
      >
        {icon}
        {children}
      </button>
    );
  }
  if (accent === "tiktok") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} bg-black text-white border-black shadow-md`}
      >
        {icon}
        {children}
      </button>
    );
  }
  // Instagram active. Gradient stops match the brand's official spec
  // (yellow → orange → pink → purple → indigo). bg-clip-padding keeps
  // the gradient inside the rounded shape so the corners stay crisp,
  // and the matching solid border closes the rounded rim cleanly.
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        backgroundImage:
          "linear-gradient(45deg,#feda75 0%,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5 100%)",
      }}
      className={`${base} bg-clip-padding text-white border-[#962fbf] shadow-md`}
    >
      {icon}
      {children}
    </button>
  );
}
