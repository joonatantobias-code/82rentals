"use client";

import { useMemo, useState } from "react";
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

// Posters / videos / platform are language-independent; captions come from
// the dictionary so they translate.
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
];

type Filter = "tiktok" | "instagram";

export default function SocialFeed() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("tiktok");

  const reels: Reel[] = useMemo(
    () =>
      REEL_BASE.map((r, i) => ({
        ...r,
        caption: t.socialFeed.reels[i]?.caption ?? "",
        likes: t.socialFeed.reels[i]?.likes ?? "",
      })),
    [t]
  );

  const filteredReels = useMemo(
    () => reels.filter((r) => r.platform === filter),
    [reels, filter]
  );

  // Repeat enough copies so the marquee always feels populated even when
  // the user filters down to one platform.
  const loop = useMemo(() => {
    const minLength = 16;
    const repeats = Math.ceil(minLength / filteredReels.length);
    const arr: Reel[] = [];
    for (let i = 0; i < repeats * 2; i++) arr.push(...filteredReels);
    return arr;
  }, [filteredReels]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -left-20" />
      <div className="blob-turquoise w-[220px] h-[220px] bottom-10 -right-10" />

      {/* Outlined 82 */}
      <span
        aria-hidden
        className="num82-outline hidden md:block absolute right-4 top-2 font-display font-extrabold text-[6rem] leading-none select-none pointer-events-none tracking-tighter"
      >
        82
      </span>

      {/* Heading constrained to standard width */}
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
            >
              TikTok
            </FilterButton>
            <FilterButton
              active={filter === "instagram"}
              onClick={() => setFilter("instagram")}
              icon={<Instagram size={14} />}
            >
              Instagram
            </FilterButton>
          </div>
        </div>
      </div>

      {/* Full-viewport-width carousel */}
      <div
        key={filter}
        className="group w-screen relative left-1/2 -translate-x-1/2"
      >
        <div className="overflow-hidden py-2">
          <div
            className="flex gap-4 w-max marquee-x px-4"
            style={{ animationDuration: "55s" }}
          >
            {loop.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative block w-[200px] sm:w-[240px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-brand-secondary shrink-0"
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover/card:scale-110 transition-transform duration-700"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={r.poster}
                >
                  <source src={r.video} type="video/mp4" />
                </video>

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
                  <span className="h-12 w-12 rounded-full bg-white/85 grid place-items-center text-brand-secondary opacity-0 group-hover/card:opacity-100 transition-opacity">
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
              </a>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
        active
          ? "bg-brand-secondary text-white border-2 border-brand-secondary"
          : "bg-white text-brand-secondary border-2 border-brand-primary/30 hover:border-brand-primary"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
