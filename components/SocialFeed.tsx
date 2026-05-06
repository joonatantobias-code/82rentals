"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, Heart, MessageCircle, Play } from "lucide-react";
import { unsplashUrl, PEXELS_VIDEOS, LOCAL_PHOTOS } from "@/lib/images";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";

function TikTok({ size = 18 }: { size?: number }) {
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

export default function SocialFeed() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("tiktok");
  const [centerIndex, setCenterIndex] = useState(0);
  const [paused, setPaused] = useState(false);

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

  // When the user toggles between TikTok and Instagram, snap to the
  // first item of the new feed so they see a fresh card in the centre.
  useEffect(() => {
    setCenterIndex(0);
  }, [filter]);

  // Auto-advance every 3 seconds. Pauses while a finger / cursor is on
  // the carousel so the user can study a card.
  useEffect(() => {
    if (paused || filtered.length === 0) return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % filtered.length);
    }, 3000);
    return () => clearInterval(id);
  }, [filtered.length, paused]);

  function handleCardClick(index: number, href: string) {
    if (index === centerIndex) {
      // Second tap on the centred card opens the post on its platform.
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // First tap on a side card slides it to the middle.
      setCenterIndex(index);
    }
  }

  // Track each card's previous wrapped offset so we can detect the moment a
  // card crosses the wrap boundary (e.g. -3 → +3). On that single render we
  // suppress the transform transition; otherwise the card would streak across
  // the entire viewport. Result: the card "teleports" while at low opacity,
  // then animates into its new position on the following render.
  const prevOffsetsRef = useRef<Map<number, number>>(new Map());

  function getCardStyle(index: number): React.CSSProperties {
    const len = filtered.length;
    if (len === 0) return { display: "none" };
    let offset = index - centerIndex;
    if (offset > len / 2) offset -= len;
    if (offset <= -len / 2) offset += len;

    const prev = prevOffsetsRef.current.get(index);
    const wrapped = prev !== undefined && Math.abs(offset - prev) > 4;
    prevOffsetsRef.current.set(index, offset);

    const abs = Math.abs(offset);

    // Visibility envelope: ±3. Cards farther than that get parked at the edge
    // with opacity 0 so re-entry from the right reads as a slide, not a pop.
    if (abs > 3) {
      const parkedOffset = offset > 0 ? 4 : -4;
      return {
        transform: `translate(-50%, -50%) translateX(calc(${parkedOffset} * var(--carousel-step))) scale(0.45)`,
        opacity: 0,
        pointerEvents: "none",
        transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
      };
    }

    const scale =
      abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.66 : 0.5;
    const opacity =
      abs === 0 ? 1 : abs === 1 ? 0.92 : abs === 2 ? 0.6 : 0.22;

    return {
      transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--carousel-step))) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
      filter: abs === 0 ? "none" : `saturate(${1 - abs * 0.12})`,
      transition: wrapped
        ? "opacity 0.3s ease"
        : "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease",
    };
  }

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
              icon={<TikTok size={14} />}
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

      {/* Centred carousel. The step distance is a CSS variable so the
          spread scales with the viewport (smaller on phones, generous
          on desktop). All cards share the same absolute origin and
          translate horizontally based on their offset from center. */}
      <div
        key={filter}
        className="relative w-full mx-auto select-none"
        style={
          {
            // Step is the per-offset horizontal distance. Tighter than the
            // card width so adjacent cards tuck slightly behind the center
            // one, which reads as a layered carousel instead of a
            // disconnected line.
            "--carousel-step": "clamp(110px, 16vw, 200px)",
            height: "clamp(380px, 62vw, 500px)",
          } as React.CSSProperties
        }
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {filtered.map((r, i) => {
          const style = getCardStyle(i);
          const isCenter = i === centerIndex;
          return (
            <button
              type="button"
              key={`${filter}-${i}`}
              onClick={() => handleCardClick(i, r.href)}
              aria-label={isCenter ? `Avaa ${r.platform === "tiktok" ? "TikTokissa" : "Instagramissa"}` : `Siirrä keskelle: ${r.caption}`}
              style={{ position: "absolute", left: "50%", top: "50%", ...style }}
              className={`group/card w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-brand-secondary will-change-transform ${
                isCenter ? "shadow-glow ring-2 ring-brand-primary/40" : ""
              }`}
            >
              {/* Live video. Each filter has 7 cards so at most 7 decoders run
                  concurrently, all using HD (8 MB) Pexels sources reused
                  across cards (browser dedupes the network fetch). The
                  poster is the still fallback for the brief metadata-load
                  moment. */}
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
              <div className="absolute inset-0 bg-brand-secondary/30" />

              <span
                className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  r.platform === "tiktok"
                    ? "bg-black text-white"
                    : "bg-white text-brand-secondary"
                }`}
              >
                {r.platform === "tiktok" ? <TikTok size={11} /> : <Instagram size={11} />}
                {r.platform === "tiktok" ? "TikTok" : "Reel"}
              </span>

              <span className="absolute inset-0 grid place-items-center pointer-events-none">
                <span
                  className={`h-12 w-12 rounded-full bg-white/90 grid place-items-center text-brand-secondary transition-all ${
                    isCenter
                      ? "opacity-100 scale-100 group-hover/card:scale-110"
                      : "opacity-70"
                  }`}
                >
                  <Play size={18} className="fill-brand-secondary translate-x-0.5" />
                </span>
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2">
                  {r.caption}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/85">
                  <span className="inline-flex items-center gap-1">
                    <Heart size={11} className="fill-white" />
                    {r.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle size={11} />
                    82
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tiny dot pager so users see how many videos exist on this feed. */}
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
  // Inactive state: white background per design ask. Active uses a
  // platform-tinted dark fill so the choice reads at a glance.
  const activeClasses =
    accent === "tiktok"
      ? "bg-black text-white border-black"
      : "bg-brand-secondary text-white border-brand-secondary";
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
