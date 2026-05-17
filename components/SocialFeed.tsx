"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";

/**
 * Path to the composite "showreel" — one looped 9:16 video that
 * contains all the brand clips with whatever transitions / text
 * overlays you've edited in. Drop the file into /public and
 * point this constant at it. Web-tuned export specs:
 *
 *   - 9:16 portrait, 1080×1920 or 720×1280
 *   - libx264 CRF 24-26 (or HEVC same), +faststart
 *   - Audio stripped (the section autoplays muted)
 *   - Last frame fades back to first so the loop is invisible
 *   - Target file size under ~12 MB
 *
 * Until the composite exists this falls back to /Aloitusvideo.mp4
 * so the page never goes blank. Replace with /showreel.mp4
 * (or similar) when ready.
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
  // Lazy mount the <video> only when the section is about to
  // enter the viewport. Until then the browser sees the poster
  // alone (a tiny jpg) — no metadata fetch, no MP4 download.
  // This is what kept us under the bandwidth quota: every
  // visitor who never scrolls past the hero stops costing us
  // GBs on this section.
  const [shouldLoad, setShouldLoad] = useState(false);

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
      { rootMargin: "200px" }, // start loading ~200 px before in-view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause when off-screen, resume when back — saves decode work
  // and a bit of cellular traffic when the user scrolls past.
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
        className="num82-outline hidden md:block absolute right-4 top-2 font-display font-extrabold text-[6rem] leading-none select-none pointer-events-none tracking-tighter"
      >
        82
      </span>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="section-title">
            <span className="relative inline-block">
              Me somessa
              <BrushUnderline
                variant="spray"
                delay={0.4}
                duration={1.1}
                thickness={9}
              />
            </span>
            .
          </h2>
          <p className="mt-4 text-brand-secondary/70 text-base sm:text-lg">
            {t.socialFeed.subtitle}
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Phone-style frame holding the composite showreel.
              Single <video> means we ship one HTTP request +
              one MP4 instead of the old six-clip carousel. */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-card border-[6px] border-brand-secondary bg-brand-secondary">
            {/* Phone notch — tiny detail that sells the "real
                feed" framing without adding any weight. */}
            <span
              aria-hidden
              className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-5 w-24 rounded-full bg-brand-secondary"
            />
            {/* Poster always renders. The <video> mounts only
                after IntersectionObserver fires. */}
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
          </div>

          {/* Follow links — replaces the old tab switcher.
              Both buttons go to the live account, no tab logic
              to maintain. */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
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
      </div>
    </section>
  );
}
