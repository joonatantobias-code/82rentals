"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  Camera,
  Search,
  Play,
  Home,
  Plus,
  Inbox,
  User,
} from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";
import {
  getReels,
  fetchLiveReels,
  type Platform,
  type Reel,
} from "@/lib/socialFeed";

const SLIDE_DURATION = 650;
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
      className={`grid place-items-center rounded-full bg-white overflow-hidden shrink-0 ${
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

  // Boot with the local mock reels so the carousel has frames on
  // first paint, then swap in the live IG / TikTok feed once
  // /api/social-feed returns. The proxy itself falls back to the
  // same mocks server-side if the platform tokens are missing or
  // either API errors, so the live → mock transition is invisible
  // in those cases.
  const [allReels, setAllReels] = useState<Reel[]>(() => getReels());
  useEffect(() => {
    let cancelled = false;
    fetchLiveReels().then((reels) => {
      if (!cancelled && reels.length > 0) setAllReels(reels);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
        {/* Heading column is fully left-aligned with text-left and no
            grid neighbour pulling it sideways. Filter buttons sit on
            their own line under the subtitle on small screens, and
            float to the right side of the heading row on desktop. */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-8 mb-8 md:mb-10">
          <div className="text-left max-w-2xl">
            <h2 className="section-title text-left">
              <span className="relative inline-block">
                Me somessa
                <BrushUnderline variant="spray" delay={0.4} duration={1.1} thickness={9} />
              </span>
              .
            </h2>
            <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
              {t.socialFeed.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:shrink-0 lg:pt-2">
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
        className="relative w-full mx-auto"
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

  // 5-second rotation while the layer is active. Each card sits in
  // the centre for 5 s, then the carousel advances. Videos
  // themselves use the native `loop` attribute, so whatever frame
  // they manage to decode in those 5 s loops cleanly. The
  // play/pause useEffect below only plays the centre, so we're
  // never running more than one decoder per active layer.
  useEffect(() => {
    if (!isActive || len === 0) return;
    const t = setTimeout(() => setCi((c) => c + 1), 5_000);
    return () => clearTimeout(t);
  }, [isActive, ci, len]);

  // Reset ci back inside [0, len) once it crosses a boundary in either
  // direction (auto-rotate pushes it past len, or a click on a left-side
  // card pushes it negative). The visible state at ci and ci ± len is
  // identical because each reel has copies at i, i ± len — so we batch
  // both state updates into one render with transitions off and snap.
  useEffect(() => {
    if (len === 0) return;
    if (ci >= len || ci < 0) {
      const t = setTimeout(() => {
        // React 18 batches both setState calls in this callback into a
        // single render → render 1: transitions off + new ci, browser
        // commits the snap with no animation. Then RAF re-enables
        // transitions. No intermediate "transitions off, old ci" paint
        // means no chance for the user to see a flicker.
        setTransitionsOn(false);
        setCi((c) => {
          if (c >= len) return c - len;
          if (c < 0) return c + len;
          return c;
        });
        requestAnimationFrame(() => setTransitionsOn(true));
      }, SLIDE_DURATION + 40);
      return () => clearTimeout(t);
    }
  }, [ci, len]);

  function handleCardClick(reelIndex: number, postUrl: string) {
    // Pick the *visible* copy of the clicked reel — i.e. the one whose
    // virtualIdx is closest to current ci. Setting ci to that virtualIdx
    // makes the carousel slide in the direction of the clicked side
    // (right-side click slides left, left-side click slides right),
    // which is what the user expects. Without this, clicking a card
    // that lives on the right side of the carousel could wrap the
    // shorter way through the index range and slide the wrong direction.
    const candidates = [reelIndex - len, reelIndex, reelIndex + len];
    let bestVirtualIdx = candidates[0];
    for (const v of candidates) {
      if (Math.abs(v - ci) < Math.abs(bestVirtualIdx - ci)) bestVirtualIdx = v;
    }
    if (bestVirtualIdx === ci) {
      window.open(postUrl, "_blank", "noopener,noreferrer");
    } else {
      setCi(bestVirtualIdx);
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

  // Pause/play loop. Every <video> ships with the autoPlay
  // attribute so the browser starts playback as soon as the element
  // is ready. This effect then enforces "at most one decoder per
  // active platform layer is alive" by pausing everything that
  // isn't the current centre.
  //
  // On the centre card we *always* call .play() (even when the
  // element looks like it's already playing) and watch the
  // returned promise. If the autoplay path was blocked and the
  // promise rejects, we retry once on the loadedmetadata or
  // canplay events — that single retry is what keeps the carousel
  // moving on iOS Safari, which sometimes drops the initial
  // autoplay if too many <video> elements try to start at once.
  useEffect(() => {
    cardEntries.forEach((entry) => {
      const refKey = `${entry.reel.id}-${entry.copyKey}`;
      const v = videoRefs.current.get(refKey);
      if (!v) return;
      const shouldPlay = isActive && entry.virtualIdx === ci;
      if (shouldPlay) {
        const tryPlay = () => {
          const p = v.play();
          if (p && typeof p.catch === "function") {
            p.catch(() => {
              // Re-attempt once the element is actually playable.
              const retry = () => {
                v.play().catch(() => {});
                v.removeEventListener("canplay", retry);
              };
              v.addEventListener("canplay", retry, { once: true });
            });
          }
        };
        tryPlay();
      } else {
        if (!v.paused) v.pause();
      }
    });
  }, [isActive, ci, cardEntries]);

  // Mobile browsers (Safari especially) pause autoplaying muted
  // videos as soon as they scroll out of the viewport and refuse to
  // resume them on scroll-back unless something explicitly calls
  // .play() again. The IntersectionObserver below watches every
  // card and, when the carousel re-enters the viewport, re-plays
  // the active-layer centre. Without this the iOS user saw the
  // carousel sitting frozen on its poster after scrolling past it
  // once.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const v = entry.target as HTMLVideoElement;
          if (!isActive) continue;
          const refKey = (v.dataset.refkey as string) || "";
          const cardEntry = cardEntries.find(
            (e) => `${e.reel.id}-${e.copyKey}` === refKey,
          );
          if (!cardEntry) continue;
          if (cardEntry.virtualIdx === ci && v.paused) {
            const p = v.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );
    videoRefs.current.forEach((v) => {
      if (v) obs.observe(v);
    });
    return () => obs.disconnect();
  }, [isActive, ci, cardEntries]);

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
            {/* Inner renders at a single fixed design size (250 ×
                ~444 — the desktop card). The outer button shrinks per
                breakpoint and we transform-scale this inner to match.
                Must be absolutely positioned so its 250 × 444 layout
                box doesn't push the outer's height past the aspect-
                ratio'd target — aspect-ratio is a preference, not a
                hard cap, and a too-large in-flow child silently grew
                the button into a tall black rectangle on phones. */}
            <div className="absolute top-0 left-0 w-[250px] aspect-[9/16] origin-top-left scale-[0.68] sm:scale-[0.8] md:scale-[0.92] lg:scale-100">
              <video
                ref={(el) => {
                  videoRefs.current.set(refKey, el);
                  if (el) el.dataset.refkey = refKey;
                }}
                src={reel.videoUrl}
                poster={reel.posterUrl}
                muted
                playsInline
                loop
                autoPlay={isCenter && isActive}
                preload={isCenter ? "auto" : "metadata"}
                onLoadedMetadata={(e) => {
                  // Apply the per-reel start offset once metadata
                  // is ready (Instagram variants of the brand clips
                  // open a few seconds in, so the same source video
                  // looks distinct on the IG tab). Guarded so we
                  // never seek past the end.
                  const offset = reel.startOffset ?? 0;
                  if (offset <= 0) return;
                  const el = e.currentTarget;
                  try {
                    if (el.duration && offset < el.duration) {
                      el.currentTime = offset;
                    }
                  } catch {}
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {platform === "tiktok" ? (
                <TikTokOverlay reel={reel} isCenter={isCenter} />
              ) : (
                <ReelsOverlay reel={reel} />
              )}

              <div
                className="absolute inset-0 bg-white pointer-events-none"
                style={{
                  opacity: scrimOpacity,
                  // Sync scrim with the main slide transition so it never
                  // animates a "darkening flash" during a wrap reset.
                  transition: transitionsOn
                    ? `opacity ${SLIDE_DURATION}ms ease`
                    : "none",
                }}
              />

              {isCenter && (
                <span className="absolute inset-0 grid place-items-center pointer-events-none">
                  <span className="h-12 w-12 rounded-full bg-white/90 grid place-items-center text-black opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Play size={18} className="fill-black translate-x-0.5" />
                  </span>
                </span>
              )}
            </div>
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

      {/* Top header — "Following  For You" centred. No pipe between
          tabs, just spacing. The active tab carries a thin white
          underline directly below it. Matches the real TikTok mobile
          header layout shown in the reference. */}
      <div className="absolute top-3.5 left-0 right-0 flex items-center justify-center gap-5 text-white text-[12.5px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        <span className="opacity-60">Following</span>
        <span className="relative">
          For You
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-white rounded-full" />
        </span>
      </div>
      <span className="absolute top-3.5 right-3 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
        <Search size={16} />
      </span>

      {/* Right rail. Avatar at top with the red "+" follow badge below
          it (TikTok's profile slot), then heart / comment / share with
          their counts. */}
      <div className="absolute right-2.5 bottom-20 flex flex-col items-center gap-4 text-white pointer-events-none">
        <span className="relative">
          <BrandAvatar size={38} />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#FE2C55] grid place-items-center text-white text-[11px] font-extrabold leading-none">
            +
          </span>
        </span>
        <RailIcon icon={<Heart size={24} className="fill-white" />} label={reel.likes} />
        <RailIcon icon={<MessageCircle size={24} />} label={reel.comments} />
        <RailIcon icon={<Send size={24} className="-rotate-12" />} label={reel.shares} />
      </div>

      {/* Bottom-left text block. text-left explicitly because the parent
          <button> element ships with text-align: center from the user
          agent stylesheet — without overriding it the handle, caption,
          and music line all rendered centred. Username has no leading
          "@" per the user's preference (real TikTok includes it; we
          drop it for our brand). */}
      <div className="absolute left-3.5 right-14 bottom-9 text-white text-left">
        <p className="text-[11px] font-extrabold leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          82Rentals
        </p>
        <p className="text-[12px] font-medium leading-snug line-clamp-2 mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <Music2 size={13} />
          <span className="truncate">{reel.audioLabel}</span>
        </div>
      </div>

      {/* Music cover, just above the bottom nav so it doesn't collide. */}
      <div
        className={`absolute bottom-9 right-3 h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-black ring-1 ring-white/30 grid place-items-center pointer-events-none ${
          isCenter ? "tiktok-disc-spin" : ""
        }`}
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-white/40" />
      </div>

      {/* TikTok bottom navigation strip — Home, Search, Create, Inbox,
          Profile. Mirrors the chrome at the bottom of the real TikTok
          mobile app. */}
      <div className="absolute left-0 right-0 bottom-0 h-8 px-2 flex items-center justify-around bg-black/45 backdrop-blur-[2px] text-white pointer-events-none">
        <NavStub icon={<Home size={13} className="fill-white" />} label="Home" />
        <NavStub icon={<Search size={13} />} label="Search" />
        <span
          className="relative h-5 w-7 rounded-md grid place-items-center"
          style={{
            background:
              "linear-gradient(90deg, #25F4EE 0%, #25F4EE 20%, white 20%, white 80%, #FE2C55 80%)",
          }}
        >
          <span className="absolute inset-0 rounded-md bg-white grid place-items-center">
            <Plus size={13} strokeWidth={3} className="text-black" />
          </span>
          <span className="absolute -left-0.5 top-0 bottom-0 w-1.5 rounded-l-md bg-[#25F4EE]" />
          <span className="absolute -right-0.5 top-0 bottom-0 w-1.5 rounded-r-md bg-[#FE2C55]" />
        </span>
        <NavStub icon={<Inbox size={13} />} label="Inbox" />
        <NavStub icon={<User size={13} />} label="Profile" />
      </div>
    </>
  );
}

function NavStub({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <span className="leading-none">{icon}</span>
      <span className="text-[7.5px] font-medium leading-none opacity-90">
        {label}
      </span>
    </span>
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

      {/* Top header — italic "Reels" wordmark left, Camera icon right
          (the real IG mobile chrome shown in the reference). */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
        <span className="text-[18px] font-extrabold italic tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] leading-none">
          Reels
        </span>
        <Camera size={18} className="opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Right rail. Sits low in the card (bottom-12) so the icon
          stack reads at roughly the same height range that real IG
          Reels uses for the engagement column. The album-art square
          at the bottom of the rail is gone — its music-note glyph
          read as TikTok styling, which doesn't belong on the Reels
          card. The audio attribution still lives in the bottom-left
          text block. */}
      <div className="absolute right-2.5 bottom-12 flex flex-col items-center gap-4 text-white pointer-events-none">
        <RailIconReels icon={<Heart size={24} />} label={reel.likes} />
        <RailIconReels icon={<MessageCircle size={24} />} label={reel.comments} />
        <RailIconReels icon={<Send size={24} className="-rotate-12" />} />
        <RailIconReels icon={<Bookmark size={24} />} />
      </div>

      {/* Bottom-left text block. text-left to override the parent
          <button>'s default centred alignment. */}
      <div className="absolute left-3.5 right-14 bottom-9 text-white text-left">
        <div className="flex items-center gap-1.5">
          <BrandAvatar size={22} ring="white" />
          <span className="text-[11.5px] font-extrabold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
            82Rentals
          </span>
          <span className="text-[10px] opacity-90 leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
            · Seuraa
          </span>
        </div>
        <p className="text-[12px] font-medium leading-snug line-clamp-2 mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {reel.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <Music2 size={13} />
          <span className="truncate">{reel.audioLabel}</span>
        </div>
      </div>

      {/* IG bottom nav, mirroring the chrome at the bottom of the real
          Instagram mobile app. Keeps the right rail at the same height
          as TikTok. */}
      <div className="absolute left-0 right-0 bottom-0 h-8 px-2 flex items-center justify-around bg-black/45 backdrop-blur-[2px] text-white pointer-events-none">
        <Home size={15} className="fill-white" />
        <Search size={15} />
        <span className="block h-3.5 w-3.5 rounded-[3px] border-[1.5px] border-white" />
        <Heart size={15} />
        <BrandAvatar size={16} ring="white" />
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
