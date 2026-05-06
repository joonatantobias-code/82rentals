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
import { unsplashUrl, PEXELS_VIDEOS, LOCAL_PHOTOS } from "@/lib/images";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";

function TikTokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

type Reel = {
  platform: "tiktok" | "instagram";
  caption: string;
  likes: string;
  video: string;
  poster: string;
  href: string;
};

const REEL_BASE: Omit<Reel, "caption" | "likes">[] = [
  { platform: "tiktok", video: PEXELS_VIDEOS.tricks, poster: LOCAL_PHOTOS.coupleAction, href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.blueSea, poster: unsplashUrl("jetskiOcean", { w: 800 }), href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.fast, poster: unsplashUrl("jetskiSplash", { w: 800 }), href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.tricks, poster: LOCAL_PHOTOS.yellowRider, href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.blueSea, poster: LOCAL_PHOTOS.redRider, href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.fast, poster: unsplashUrl("helsinki1", { w: 800 }), href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.tricks, poster: unsplashUrl("jetskiAction1", { w: 800 }), href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.blueSea, poster: LOCAL_PHOTOS.blueSide, href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.fast, poster: LOCAL_PHOTOS.blue1, href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.tricks, poster: unsplashUrl("jetskiAction3", { w: 800 }), href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.blueSea, poster: LOCAL_PHOTOS.blue2, href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.fast, poster: unsplashUrl("jetskiAction2", { w: 800 }), href: "https://instagram.com/82rentals" },
  { platform: "tiktok", video: PEXELS_VIDEOS.fast, poster: unsplashUrl("helsinki2", { w: 800 }), href: "https://www.tiktok.com/@82rentals" },
  { platform: "instagram", video: PEXELS_VIDEOS.tricks, poster: LOCAL_PHOTOS.coupleAction, href: "https://instagram.com/82rentals" },
];

type Filter = "tiktok" | "instagram";

const SLIDE_DURATION = 850;
const PHASE_A_DURATION = 700;

export default function SocialFeed() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("tiktok");
  const [centerIndex, setCenterIndex] = useState(0);

  const reels: Reel[] = useMemo(
    () =>
      REEL_BASE.map((r, i) => ({
        ...r,
        caption: t.socialFeed.reels[i]?.caption ?? "",
        likes: t.socialFeed.reels[i]?.likes ?? "",
      })),
    [t]
  );

  const filtered = useMemo(
    () => reels.filter((r) => r.platform === filter),
    [reels, filter]
  );

  // Snap to the first reel of the new feed when the user toggles platforms.
  useEffect(() => {
    setCenterIndex(0);
  }, [filter]);

  // Auto-advance every 3 seconds. The interval is reset whenever centerIndex
  // changes — so a manual click doesn't get clobbered 0.4 s later by an
  // already-running timer. No hover/touch pause: a stray cursor over the
  // carousel was constantly resetting the timer in the previous build, which
  // is why the user reported the rotation feeling like it never fired.
  useEffect(() => {
    if (filtered.length === 0) return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % filtered.length);
    }, 3000);
    return () => clearInterval(id);
  }, [filtered.length, centerIndex]);

  function handleCardClick(index: number, href: string) {
    if (index === centerIndex) {
      window.open(href, "_blank", "noopener,noreferrer");
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

  // Three-phase wrap orchestration. When a card crosses the wrap boundary
  // (e.g. its previous offset was -3 and the new offset is +3), the React
  // render alone would animate it as a single streak across the carousel.
  // Instead:
  //   Phase A — slide it past the left edge (offset -4) with full
  //             transition + opacity → 0, so it looks like a real exit.
  //   Phase B — once that lands, FLIP-teleport it past the right edge
  //             (offset +4) with no transition.
  //   Phase C — restore the React-target inline style; the browser
  //             interpolates from +4 back to +3, giving the new arrival
  //             a smooth slide-in.
  // useLayoutEffect runs synchronously after commit but before paint, so
  // the user never sees the freshly-rendered "+3 with no animation" frame.
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

          // The leaving direction is the side the card was on before wrap.
          const leavingDir = prev < 0 ? -1 : 1;
          const phaseAOff = leavingDir * 4;
          const phaseBOff = -leavingDir * 4;

          // Phase A — slide off the leaving edge.
          el.style.transition = `transform ${PHASE_A_DURATION}ms cubic-bezier(0.4, 0, 0.6, 1), opacity ${PHASE_A_DURATION}ms ease, filter 0.4s ease`;
          el.style.transform = `translate(-50%, -50%) translateX(calc(${phaseAOff} * var(--carousel-step))) scale(0.45)`;
          el.style.opacity = "0";
          el.style.filter = "saturate(0.4)";

          // Cancel any pending phase B for this card to avoid races on
          // rapid centerIndex changes (e.g. dot-pager click during auto).
          const pending = timersRef.current.get(i);
          if (pending) clearTimeout(pending);

          const tid = setTimeout(() => {
            const node = cardRefs.current[i];
            if (!node) return;
            // Phase B — instant teleport to the entry side.
            node.style.transition = "none";
            node.style.transform = `translate(-50%, -50%) translateX(calc(${phaseBOff} * var(--carousel-step))) scale(0.45)`;
            node.style.opacity = "0";
            // Force a reflow so the parked state lands before phase C.
            void node.offsetHeight;
            // Phase C — restore the React-target style, browser animates.
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

  // Reset offset history + cancel pending phase Bs when feed switches.
  useEffect(() => {
    prevOffsetsRef.current.clear();
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current.clear();
  }, [filter]);

  // Cleanup on unmount.
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
              {!t.socialFeed.titleB && "."}
            </h2>
            <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg max-w-xl">
              {t.socialFeed.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <FilterButton
              active={filter === "tiktok"}
              onClick={() => setFilter("tiktok")}
              icon={<TikTokGlyph size={14} />}
              accent="tiktok"
            >
              TikTok
            </FilterButton>
            <FilterButton
              active={filter === "instagram"}
              onClick={() => setFilter("instagram")}
              icon={<Instagram size={14} />}
              accent="instagram"
            >
              Instagram
            </FilterButton>
          </div>
        </div>
      </div>

      <div
        key={filter}
        className="relative w-full mx-auto select-none"
        style={
          {
            "--carousel-step": "clamp(70px, 10vw, 130px)",
            height: "clamp(380px, 62vw, 500px)",
          } as React.CSSProperties
        }
      >
        {filtered.map((r, i) => {
          const style = getCardStyle(i);
          const isCenter = i === centerIndex;
          return (
            <button
              type="button"
              key={`${filter}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => handleCardClick(i, r.href)}
              aria-label={
                isCenter
                  ? `Avaa ${r.platform === "tiktok" ? "TikTokissa" : "Instagramissa"}`
                  : `Siirrä keskelle: ${r.caption}`
              }
              style={{ position: "absolute", left: "50%", top: "50%", ...style }}
              className={`group/card w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-black will-change-transform ${
                isCenter ? "shadow-glow ring-2 ring-brand-primary/40" : ""
              }`}
            >
              <video
                src={r.video}
                poster={r.poster}
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
                <ReelsOverlay reel={r} isCenter={isCenter} />
              )}

              {/* Centered Play affordance — visible only on the centred card
                  so the user knows clicking again opens the post. */}
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

/* TikTok-style overlay: vertical icon stack right side (avatar+follow,
 * heart, comment, share), bottom @username + caption + music attribution
 * with a tiny rotating disc. Background tint biased to black to match
 * TikTok's UI feel. */
function TikTokOverlay({ reel, isCenter }: { reel: Reel; isCenter: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />

      {/* Top row: TikTok wordmark */}
      <div className="absolute top-2 left-0 right-0 flex justify-center text-white text-[11px] font-bold tracking-wide">
        <span className="opacity-90">For You</span>
      </div>
      <div className="absolute top-2 right-2 text-white/90">
        <TikTokGlyph size={14} />
      </div>

      {/* Right rail */}
      <div className="absolute right-1.5 bottom-14 flex flex-col items-center gap-3 text-white pointer-events-none">
        <div className="relative">
          <span className="block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-brand-primary to-brand-turquoise" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#FE2C55] grid place-items-center text-white text-[10px] font-bold leading-none">
            +
          </span>
        </div>
        <RailIcon icon={<Heart size={16} className="fill-white" />} label={reel.likes} />
        <RailIcon icon={<MessageCircle size={16} />} label="82" />
        <RailIcon icon={<Send size={16} className="-rotate-12" />} label="Jaa" />
      </div>

      {/* Bottom block: handle + caption + music */}
      <div className="absolute left-2.5 right-12 bottom-2 text-white">
        <p className="text-[11px] font-extrabold leading-tight">@82rentals</p>
        <p className="text-[10.5px] font-medium leading-snug mt-0.5 line-clamp-2">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium">
          <Music2 size={10} />
          <span className="truncate">82Rentals · alkuperäinen ääni</span>
        </div>
      </div>

      {/* Spinning music disc bottom-right corner — TikTok signature touch */}
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
      <span className="h-7 w-7 rounded-full bg-black/35 grid place-items-center">
        {icon}
      </span>
      <span className="text-[9px] font-bold leading-none">{label}</span>
    </div>
  );
}

/* Instagram Reels-style overlay: vertical icon stack right side (heart,
 * comment, share, save, more), top username + verified, bottom caption
 * + audio chip with album-art square. */
function ReelsOverlay({ reel }: { reel: Reel; isCenter: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />

      {/* Top row: Reels label */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-white">
        <span className="text-[11px] font-extrabold italic tracking-wide drop-shadow">
          Reels
        </span>
        <Instagram size={14} className="opacity-90" />
      </div>

      {/* Right rail — IG order: heart, comment, share, save, more */}
      <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 text-white pointer-events-none">
        <RailIconReels icon={<Heart size={18} />} label={reel.likes} />
        <RailIconReels icon={<MessageCircle size={18} />} label="82" />
        <RailIconReels icon={<Send size={18} className="-rotate-12" />} />
        <RailIconReels icon={<Bookmark size={18} />} />
        <span className="text-white/95">
          <MoreHorizontal size={18} />
        </span>
      </div>

      {/* Bottom block: avatar + handle on a row, caption, audio chip */}
      <div className="absolute left-2.5 right-12 bottom-2 text-white">
        <div className="flex items-center gap-1.5">
          <span className="block h-5 w-5 rounded-full ring-1 ring-white bg-gradient-to-br from-[#FFC371] via-[#FF5F6D] to-[#833AB4]" />
          <span className="text-[11px] font-extrabold leading-none">82rentals</span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#3897F0] grid place-items-center text-[7px] font-black leading-none">
            ✓
          </span>
          <span className="text-[10px] opacity-90 ml-0.5">· Seuraa</span>
        </div>
        <p className="text-[10.5px] font-medium leading-snug mt-1 line-clamp-2">
          {reel.caption}
        </p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[9.5px] font-semibold">
          <span className="block h-3 w-3 rounded-sm bg-gradient-to-br from-brand-primary to-brand-turquoise" />
          <span className="truncate max-w-[110px]">82Rentals · Original audio</span>
        </div>
      </div>
    </>
  );
}

function RailIconReels({ icon, label }: { icon: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-white drop-shadow">{icon}</span>
      {label && <span className="text-[9px] font-bold leading-none">{label}</span>}
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
  const activeClasses =
    accent === "tiktok"
      ? "bg-black text-white border-black"
      : "bg-gradient-to-br from-[#FFC371] via-[#FF5F6D] to-[#833AB4] text-white border-transparent";
  const inactiveClasses =
    "bg-white text-brand-secondary border-brand-primary/30 hover:border-brand-primary";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] border-2 ${
        active ? activeClasses : inactiveClasses
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
