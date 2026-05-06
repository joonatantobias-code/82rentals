"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  MoreHorizontal,
  Search,
  Play,
} from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";
import { getReels, type Platform, type Reel } from "@/lib/socialFeed";

const SLIDE_DURATION = 850;
const FILTER_FADE_MS = 280;

function TikTokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

/* Brand avatar: company logo on a deep-blue circle. Used as the
 * profile pic on every reel card so both feeds carry our identity
 * the way real TikTok / IG accounts do. */
function BrandAvatar({
  size = 32,
  ring = "white",
}: {
  size?: number;
  ring?: "white" | "none";
}) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-brand-secondary overflow-hidden shrink-0 ${
        ring === "white" ? "ring-2 ring-white" : ""
      }`}
      style={{ height: size, width: size }}
      aria-hidden
    >
      <img
        src="/logo.png"
        alt=""
        className="object-contain"
        style={{ height: size * 0.72, width: size * 0.72 }}
      />
    </span>
  );
}

export default function SocialFeed() {
  const t = useT();
  const [filter, setFilter] = useState<Platform>("tiktok");

  const allReels = useMemo(() => getReels(), []);
  const tiktokReels = useMemo(
    () => allReels.filter((r) => r.platform === "tiktok"),
    [allReels]
  );
  const instagramReels = useMemo(
    () => allReels.filter((r) => r.platform === "instagram"),
    [allReels]
  );

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
            <h2 className="section-title">
              <span className="relative inline-block">
                Me somessa
                <BrushUnderline variant="spray" delay={0.4} duration={1.1} thickness={9} />
              </span>
              .
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

      {/* Both feeds are mounted simultaneously and cross-faded by opacity.
          Mounting/unmounting <video> elements caused the flash the user
          reported when switching platforms — keeping the DOM stable
          eliminates it. The inactive layer's videos are paused via refs
          so we don't pay double the decoder cost. */}
      <div
        className="relative w-full mx-auto select-none"
        style={{ height: "clamp(380px, 62vw, 500px)" }}
      >
        <CarouselLayer
          reels={tiktokReels}
          platform="tiktok"
          isActive={filter === "tiktok"}
        />
        <CarouselLayer
          reels={instagramReels}
          platform="instagram"
          isActive={filter === "instagram"}
        />
      </div>
    </section>
  );
}

/* One platform's stack of cards. Renders each reel THREE times (a left
 * shadow at virtual position i-len, a main copy at i, a right shadow at
 * i+len). Both the leaving copy and the entering copy are real React
 * elements, so the wrap arrives in PARALLEL with the rest of the slide
 * — the leftmost slides off-left at the same pace and over the same
 * duration as the new card sliding in from the right.
 *
 * Two layers (one per platform) live in the same absolute container and
 * cross-fade by opacity, so toggling the filter never unmounts a video. */
function CarouselLayer({
  reels,
  platform,
  isActive,
}: {
  reels: Reel[];
  platform: Platform;
  isActive: boolean;
}) {
  const len = reels.length;
  const [ci, setCi] = useState(0);
  const [transitionsOn, setTransitionsOn] = useState(true);
  const videoRefs = useRef<Map<string, HTMLVideoElement | null>>(new Map());

  // Auto-advance only for the active platform.
  useEffect(() => {
    if (!isActive || len === 0) return;
    const id = setInterval(() => setCi((c) => c + 1), 3000);
    return () => clearInterval(id);
  }, [isActive, len]);

  // Reset ci once a full lap completes. Triggered after the slide that
  // brought ci to len has had time to finish; the rendered visuals at
  // ci = len are identical to ci = 0 (same card content at every offset),
  // just produced by a different copy of each reel — so we briefly turn
  // transitions off to let the transforms snap silently to ci = 0.
  useEffect(() => {
    if (len === 0 || ci < len) return;
    const t = setTimeout(() => {
      setTransitionsOn(false);
      requestAnimationFrame(() => {
        setCi((c) => c - len);
        requestAnimationFrame(() => setTransitionsOn(true));
      });
    }, SLIDE_DURATION + 80);
    return () => clearTimeout(t);
  }, [ci, len]);

  function handleCardClick(reelIndex: number, postUrl: string) {
    if (reelIndex === ((ci % len) + len) % len) {
      window.open(postUrl, "_blank", "noopener,noreferrer");
    } else {
      setCi(reelIndex);
    }
  }

  // 3 copies per reel. Each entry has a stable virtualIdx so its offset
  // computation is just `virtualIdx - ci` — no wrap-to-nearest.
  const cardEntries = useMemo(() => {
    const arr: Array<{
      reel: Reel;
      reelIndex: number;
      virtualIdx: number;
      copyKey: string;
    }> = [];
    reels.forEach((r, i) => {
      arr.push({ reel: r, reelIndex: i, virtualIdx: i - len, copyKey: "left" });
      arr.push({ reel: r, reelIndex: i, virtualIdx: i, copyKey: "main" });
      arr.push({ reel: r, reelIndex: i, virtualIdx: i + len, copyKey: "right" });
    });
    return arr;
  }, [reels, len]);

  const transition = transitionsOn
    ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SLIDE_DURATION}ms ease, filter 0.5s ease`
    : "none";

  function getCardStyle(virtualIdx: number): React.CSSProperties {
    const offset = virtualIdx - ci;
    const abs = Math.abs(offset);
    // Beyond the visible band + a small parking margin, hide entirely
    // (no transitions, no z-index) so far-out copies don't waste paint.
    if (abs > 4) {
      return {
        transform: `translate(-50%, -50%) translateX(calc(${offset > 0 ? 4 : -4} * var(--carousel-step))) scale(0.45)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition,
      };
    }
    const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.66 : 0.5;
    // abs === 4 acts as the "parked just past the visible edge" position
    // — needed so a fade-in slide from offset 4 → 3 (or 4 → -3) reads as
    // a real entry instead of a pop-in.
    const opacity = abs <= 3 ? 1 : 0;
    return {
      transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--carousel-step))) scale(${scale})`,
      opacity,
      zIndex: abs <= 3 ? 10 - abs : 0,
      filter: abs === 0 ? "none" : `saturate(${1 - abs * 0.12})`,
      transition,
    };
  }

  function getScrimOpacity(virtualIdx: number): number {
    const offset = virtualIdx - ci;
    const abs = Math.abs(offset);
    if (abs === 0) return 0;
    if (abs <= 1) return 0.18;
    if (abs <= 2) return 0.4;
    if (abs <= 3) return 0.62;
    return 0.62;
  }

  // Pause inactive-layer videos to save decoder cost; resume on activation.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      if (isActive) v.play().catch(() => {});
      else v.pause();
    });
  }, [isActive]);

  return (
    <div
      aria-hidden={!isActive}
      className="absolute inset-0"
      style={
        {
          "--carousel-step": "clamp(70px, 10vw, 130px)",
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          transition: `opacity ${FILTER_FADE_MS}ms ease`,
        } as React.CSSProperties
      }
    >
      {cardEntries.map((entry) => {
        const { reel, reelIndex, virtualIdx, copyKey } = entry;
        const offset = virtualIdx - ci;
        const isCenter = offset === 0;
        const style = getCardStyle(virtualIdx);
        const scrimOpacity = getScrimOpacity(virtualIdx);
        const refKey = `${reel.id}-${copyKey}`;
        return (
          <button
            type="button"
            key={refKey}
            onClick={() => handleCardClick(reelIndex, reel.postUrl)}
            tabIndex={isActive && Math.abs(offset) <= 3 ? 0 : -1}
            aria-label={
              isCenter
                ? `Avaa ${reel.platform === "tiktok" ? "TikTokissa" : "Instagramissa"}`
                : `Siirrä keskelle: ${reel.caption}`
            }
            style={{ position: "absolute", left: "50%", top: "50%", ...style }}
            className={`group/card w-[170px] sm:w-[200px] md:w-[230px] lg:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-black will-change-transform ${
              isCenter ? "shadow-glow" : ""
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current.set(refKey, el);
              }}
              src={reel.videoUrl}
              poster={reel.posterUrl}
              autoPlay={isActive}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {platform === "tiktok" ? (
              <TikTokOverlay reel={reel} isCenter={isCenter} />
            ) : (
              <ReelsOverlay reel={reel} />
            )}

            <div
              className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-500"
              style={{ opacity: scrimOpacity }}
            />

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
  );
}

/* TikTok-style overlay. Authentic phone-app feel:
 *   - Top bar: "Following | For You" with the active tab underlined.
 *     Search icon top-right, just like the app.
 *   - Right rail (top → bottom): brand avatar, heart, comment, share.
 *     No "+follow" badge: brand identity comes from the avatar itself,
 *     not an explicit follow CTA.
 *   - Bottom: caption, music attribution with a spinning disc on the
 *     centred card. */
function TikTokOverlay({ reel, isCenter }: { reel: Reel; isCenter: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

      {/* Top: real-app header. "Following | For You" sits centred near
          the top of the card with the active tab underlined; the Search
          icon mirrors it on the right. Margins match the phone-app
          ratios (~3.5% from top, ~5% from right). */}
      <div className="absolute top-3.5 left-0 right-0 flex items-center justify-center gap-3 text-white text-[12.5px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        <span className="opacity-65">Following</span>
        <span className="opacity-30">|</span>
        <span className="relative">
          For You
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-white rounded-full" />
        </span>
      </div>
      <span className="absolute top-3.5 right-3 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        <Search size={16} />
      </span>

      {/* Right rail. Avatar at top of the stack matches TikTok's profile
          slot (just no +follow chip — we skipped the explicit follow CTA). */}
      <div className="absolute right-2.5 bottom-20 flex flex-col items-center gap-4 text-white pointer-events-none">
        <BrandAvatar size={36} />
        <RailIcon icon={<Heart size={24} className="fill-white" />} label={reel.likes} />
        <RailIcon icon={<MessageCircle size={24} />} label={reel.comments} />
        <RailIcon icon={<Send size={24} className="-rotate-12" />} label={reel.shares} />
      </div>

      {/* Bottom-left text block. Caption sits above the music line with
          the spinning disc on the bottom-right corner — that's the slot
          TikTok uses for the audio cover art. */}
      <div className="absolute left-3.5 right-14 bottom-3.5 text-white">
        <p className="text-[12px] font-medium leading-snug line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <Music2 size={13} />
          <span className="truncate">{reel.audioLabel}</span>
        </div>
      </div>

      <div
        className={`absolute bottom-3 right-3 h-9 w-9 rounded-full bg-gradient-to-br from-zinc-700 to-black ring-1 ring-white/30 grid place-items-center pointer-events-none ${
          isCenter ? "tiktok-disc-spin" : ""
        }`}
      >
        <span className="block h-3 w-3 rounded-full bg-white/40" />
      </div>
    </>
  );
}

function RailIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {icon}
      </span>
      <span className="text-[10px] font-semibold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {label}
      </span>
    </div>
  );
}

/* Instagram Reels-style overlay. Authentic mobile-app shape:
 *   - Top: italic "Reels" wordmark left, camera icon right.
 *   - Right rail: heart, comment, share, save, more.
 *   - Bottom-left: small brand avatar above the caption + audio chip.
 *     No @handle text — the avatar carries the brand identity. */
function ReelsOverlay({ reel }: { reel: Reel }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

      {/* Top: italic "Reels" wordmark left, brand avatar right. The
          avatar replaces the generic camera icon so the channel logo
          is visible in the top corner where the user expects it. */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
        <span className="text-[18px] font-extrabold italic tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] leading-none">
          Reels
        </span>
        <BrandAvatar size={28} ring="white" />
      </div>

      {/* Right rail — IG ordering. Lowered so the stack sits in the
          mid-to-lower part of the card the way it does in the IG
          mobile app, instead of riding too high. */}
      <div className="absolute right-2.5 bottom-32 flex flex-col items-center gap-4 text-white pointer-events-none">
        <RailIconReels icon={<Heart size={24} />} label={reel.likes} />
        <RailIconReels icon={<MessageCircle size={24} />} label={reel.comments} />
        <RailIconReels icon={<Send size={24} className="-rotate-12" />} label={reel.shares} />
        <RailIconReels icon={<Bookmark size={24} />} />
        <span className="text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <MoreHorizontal size={24} />
        </span>
      </div>

      {/* Bottom-left text block: caption above, audio line below. The
          channel avatar is now in the top-right corner instead of
          repeating it here. */}
      <div className="absolute left-3.5 right-14 bottom-3.5 text-white">
        <p className="text-[12px] font-medium leading-snug line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <Music2 size={13} />
          <span className="truncate">{reel.audioLabel}</span>
        </div>
      </div>
    </>
  );
}

function RailIconReels({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        {icon}
      </span>
      {label && (
        <span className="text-[10px] font-semibold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
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
