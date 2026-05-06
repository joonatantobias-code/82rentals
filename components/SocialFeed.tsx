"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  MoreHorizontal,
  Search,
  Camera,
  Play,
} from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";
import { getReels, type Platform, type Reel } from "@/lib/socialFeed";

const SLIDE_DURATION = 850;
const PHASE_A_DURATION = SLIDE_DURATION;
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
            {t.socialFeed.eyebrow && (
              <span className="section-eyebrow">{t.socialFeed.eyebrow}</span>
            )}
            <h2 className="section-title">
              {t.socialFeed.titleA && <>{t.socialFeed.titleA} </>}
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

/* One platform's stack of cards. Lives in absolute layout inside the
 * shared carousel container so two layers can occupy the same space and
 * cross-fade without remounting any DOM. */
function CarouselLayer({
  reels,
  platform,
  isActive,
}: {
  reels: Reel[];
  platform: Platform;
  isActive: boolean;
}) {
  const [centerIndex, setCenterIndex] = useState(0);

  // Auto-advance every 3 s — only for the active platform; the inactive
  // one stays on whatever card it was on when last visible, so when the
  // user comes back the carousel feels like it kept its place.
  useEffect(() => {
    if (!isActive || reels.length === 0) return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % reels.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isActive, reels.length, centerIndex]);

  function handleCardClick(index: number, postUrl: string) {
    if (index === centerIndex) {
      window.open(postUrl, "_blank", "noopener,noreferrer");
    } else {
      setCenterIndex(index);
    }
  }

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevOffsetsRef = useRef<Map<number, number>>(new Map());
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  function computeOffset(index: number, len: number, ci: number) {
    let offset = index - ci;
    if (offset > len / 2) offset -= len;
    if (offset <= -len / 2) offset += len;
    return offset;
  }

  function getCardStyle(index: number): React.CSSProperties {
    const len = reels.length;
    if (len === 0) return { display: "none" };
    const offset = computeOffset(index, len, centerIndex);
    const abs = Math.abs(offset);

    const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.66 : 0.5;

    // Side cards are NOT opacity-faded any more — that made the cards
    // behind them bleed through (one video showing under another). Cards
    // stay fully opaque at the box level; the "fade to back" effect is
    // produced by an inner dark scrim (see the per-card `<div bg-black>`
    // overlay that scales its own opacity by absolute offset).
    return {
      transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--carousel-step))) scale(${scale})`,
      opacity: 1,
      zIndex: 10 - abs,
      transition: `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease`,
    };
  }

  function getScrimOpacity(index: number): number {
    const len = reels.length;
    if (len === 0) return 0;
    const offset = computeOffset(index, len, centerIndex);
    const abs = Math.abs(offset);
    if (abs === 0) return 0;
    if (abs === 1) return 0.18;
    if (abs === 2) return 0.45;
    return 0.7;
  }

  // Three-phase wrap orchestration: slide off left → FLIP teleport → slide in right.
  useLayoutEffect(() => {
    const len = reels.length;
    if (len === 0) return;
    reels.forEach((_, i) => {
      const off = computeOffset(i, len, centerIndex);
      const prev = prevOffsetsRef.current.get(i);
      if (prev !== undefined && Math.abs(off - prev) > 4) {
        const el = cardRefs.current[i];
        if (el) {
          const targetTransform = el.style.transform;
          const targetFilter = el.style.filter;
          // Cards are normally fully opaque (so they don't bleed through
          // each other). During the wrap we *do* want the leaving card
          // to fade out and the re-entering one to fade in, since
          // teleporting an opaque card across the screen would be jarring.
          // We override opacity for phases A/B and restore it on phase C.
          const restoreTransition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, filter 0.5s ease`;

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
            node.style.transition = restoreTransition;
            node.style.transform = targetTransform;
            node.style.opacity = "1";
            node.style.filter = targetFilter;
            timersRef.current.delete(i);
          }, PHASE_A_DURATION);
          timersRef.current.set(i, tid);
        }
      }
      prevOffsetsRef.current.set(i, off);
    });
  }, [centerIndex, reels]);

  // Pause this layer's videos when it becomes inactive; play them when
  // active. Saves on decoder load for the inactive feed.
  useEffect(() => {
    if (isActive) {
      videoRefs.current.forEach((v) => {
        v?.play().catch(() => {});
      });
    } else {
      videoRefs.current.forEach((v) => v?.pause());
    }
  }, [isActive]);

  // Cleanup pending phase-B timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

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
      {reels.map((r, i) => {
        const style = getCardStyle(i);
        const isCenter = i === centerIndex;
        const scrimOpacity = getScrimOpacity(i);
        return (
          <button
            type="button"
            key={r.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => handleCardClick(i, r.postUrl)}
            tabIndex={isActive ? 0 : -1}
            aria-label={
              isCenter
                ? `Avaa ${r.platform === "tiktok" ? "TikTokissa" : "Instagramissa"}`
                : `Siirrä keskelle: ${r.caption}`
            }
            style={{ position: "absolute", left: "50%", top: "50%", ...style }}
            className={`group/card w-[170px] sm:w-[200px] md:w-[230px] lg:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden shadow-soft bg-black will-change-transform ${
              isCenter ? "shadow-glow" : ""
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={r.videoUrl}
              poster={r.posterUrl}
              autoPlay={isActive}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {platform === "tiktok" ? (
              <TikTokOverlay reel={r} isCenter={isCenter} />
            ) : (
              <ReelsOverlay reel={r} />
            )}

            {/* Side-card depth scrim. Sits above the video + overlay,
                below the centred-card play button. Side cards darken as
                they move further from centre — this is the visual that
                used to be done with card-level opacity, which leaked
                neighbouring videos through. */}
            <div
              className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
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

      {/* Top: italic "Reels" wordmark left, Camera icon right. Match
          mobile-app safe-area margins (3.5% top, 5% sides). */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
        <span className="text-[18px] font-extrabold italic tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] leading-none">
          Reels
        </span>
        <Camera size={18} className="opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Right rail — IG ordering. */}
      <div className="absolute right-2.5 bottom-24 flex flex-col items-center gap-4 text-white pointer-events-none">
        <RailIconReels icon={<Heart size={24} />} label={reel.likes} />
        <RailIconReels icon={<MessageCircle size={24} />} label={reel.comments} />
        <RailIconReels icon={<Send size={24} className="-rotate-12" />} label={reel.shares} />
        <RailIconReels icon={<Bookmark size={24} />} />
        <span className="text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          <MoreHorizontal size={24} />
        </span>
      </div>

      {/* Bottom-left text block:
            avatar (own line)
            caption
            ♪ audio · attribution                                          */}
      <div className="absolute left-3.5 right-14 bottom-3.5 text-white">
        <BrandAvatar size={28} ring="white" />
        <p className="text-[12px] font-medium leading-snug line-clamp-2 mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
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
