"use client";

import { useEffect, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  Plus,
} from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";

/**
 * Showreel source. Only one video — the brand owner's
 * /Aloitusvideo.mp4. Switch this constant to a longer composite
 * MP4 (9:16, ≤ 12 MB, +faststart, no audio) when one is edited.
 */
const SHOWREEL_SRC = "/Aloitusvideo.mp4";
const SHOWREEL_POSTER = "/Aloitusvideo-poster.jpg";

function TikTokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

export default function SocialFeed() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Lazy-mount the <video> only when the section is ~200 px from
  // entering the viewport — same trick we used to keep the
  // bandwidth quota happy after the section was killing it on
  // every page load.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause off-screen, resume on re-enter, so decoder isn't
  // spinning when nobody's looking.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else {
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="blob-primary w-[280px] h-[280px] -top-10 -left-20" />
      <div className="blob-turquoise w-[220px] h-[220px] bottom-10 -right-10" />

      <span
        aria-hidden
        className="num82-outline hidden lg:block absolute right-6 bottom-2 font-display font-extrabold text-[6rem] leading-none select-none pointer-events-none tracking-tighter"
      >
        82
      </span>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Two-column grid on lg+: text left, phone right.
            Below lg the grid collapses to a single column so the
            heading sits above the phone on tablets / phones. */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — heading + subtitle + follow buttons */}
          <div
            ref={containerRef}
            className="text-left order-2 lg:order-1"
          >
            <span className="section-eyebrow">{t.socialFeed.eyebrow}</span>
            <h2 className="section-title mt-2 text-left">
              {t.socialFeed.titleA}{" "}
              <span className="relative inline-block">
                {t.socialFeed.titleHighlight}
                <BrushUnderline
                  variant="spray"
                  delay={0.4}
                  duration={1.1}
                  thickness={9}
                />
              </span>
              {t.socialFeed.titleB}
            </h2>
            <p className="mt-5 text-brand-secondary/75 text-base sm:text-lg max-w-xl">
              {t.socialFeed.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <a
                href="https://instagram.com/82rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-secondary text-white px-5 h-11 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
              >
                <Instagram size={16} />
                @82rentals
              </a>
              <a
                href="https://www.tiktok.com/@82rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-secondary text-white px-5 h-11 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
              >
                <TikTokGlyph size={14} />
                @82rentals
              </a>
            </div>
          </div>

          {/* RIGHT — phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[260px] xl:max-w-[280px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-card border-[6px] border-brand-secondary bg-brand-secondary"
            >
              {/* iPhone-style notch — sells the "real feed"
                  framing for free. */}
              <span
                aria-hidden
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-5 w-20 rounded-full bg-brand-secondary"
              />

              {/* Poster always renders; video mounts on
                  IntersectionObserver. */}
              <img
                src={SHOWREEL_POSTER}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              />
              {shouldLoad && (
                <video
                  ref={videoRef}
                  src={SHOWREEL_SRC}
                  poster={SHOWREEL_POSTER}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* TikTok-style UI overlay — gives the visitor the
                  instant cue that they're watching a real reel,
                  not just a marketing video on a page. */}
              <TikTokOverlay />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * TikTok-style chrome painted on top of the showreel video.
 * Left bottom: profile name + caption + sound. Right rail:
 * profile avatar with +, like, comment, share, bookmark, then
 * a spinning record at the bottom. Numbers are intentionally
 * static — this is brand framing, not a live counter.
 */
function TikTokOverlay() {
  return (
    <>
      {/* Top scrim so the time/notch area doesn't fight the video */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent z-10 pointer-events-none"
      />
      {/* Bottom scrim so the caption + sound rail stays readable
          over bright video frames. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none"
      />

      {/* Bottom-left caption block */}
      <div className="absolute left-3 right-14 bottom-3 z-20 text-white">
        <div className="text-[13px] font-extrabold drop-shadow">@82rentals</div>
        <div className="mt-1 text-[11px] leading-snug drop-shadow">
          Linkki biossa varauksiin 🌊 #vesijetti #helsinki #seadoo
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-white/90">
          <Music2 size={10} className="shrink-0" />
          <span className="truncate">alkuperäinen ääni · 82Rentals</span>
        </div>
      </div>

      {/* Right rail icons */}
      <div className="absolute right-2 bottom-3 z-20 flex flex-col items-center gap-3.5 text-white">
        <RailAvatar />
        <RailIcon
          icon={<Heart size={20} className="fill-current text-rose-500" />}
          label="1.2k"
        />
        <RailIcon icon={<MessageCircle size={20} className="fill-current" />} label="42" />
        <RailIcon icon={<Bookmark size={20} className="fill-current" />} label="58" />
        <RailIcon icon={<Send size={20} />} label="14" />
        <SpinningDisc />
      </div>
    </>
  );
}

function RailAvatar() {
  return (
    <div className="relative">
      <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white bg-brand-deep grid place-items-center">
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="object-contain w-[70%] h-[70%]"
        />
      </div>
      {/* The "+" subscribe button that sits on the avatar's
          bottom edge on real TikTok. */}
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-rose-500 grid place-items-center text-white ring-2 ring-black/0">
        <Plus size={10} strokeWidth={3} />
      </span>
    </div>
  );
}

function RailIcon({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="drop-shadow">{icon}</span>
      <span className="text-[10px] font-bold drop-shadow tabular-nums">
        {label}
      </span>
    </div>
  );
}

function SpinningDisc() {
  return (
    <div className="relative h-9 w-9 mt-1 animate-[spin_4s_linear_infinite]">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-700 ring-2 ring-white/15"
      />
      <span
        aria-hidden
        className="absolute inset-2 rounded-full overflow-hidden bg-brand-deep grid place-items-center"
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="object-contain w-[75%] h-[75%]"
        />
      </span>
    </div>
  );
}
