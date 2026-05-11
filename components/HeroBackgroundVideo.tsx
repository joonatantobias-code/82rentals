"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seamless looping background video.
 *
 * Strategy:
 *   - Only one of two stacked <video> elements plays at a time, so we
 *     don't run two decoders in parallel (which on weaker hardware
 *     produced visible micro-stutters in either layer).
 *   - When the active video gets within `warmupMs` of its end, we
 *     start the standby playing from t=0. By the time the crossfade
 *     window opens, the standby is already in stable playback and
 *     decoder-warm — handoff is just an opacity flip with no .play()
 *     spin-up latency.
 *   - When the crossfade completes, the outgoing video is rewound to
 *     t=0 and paused so it's primed to be next round's standby.
 *
 * No native `loop` attribute: we manage the rewinding ourselves so the
 * loop seam never lands on a visible video.
 *
 * Mobile (< 768 px) skips the videos entirely and stays on the poster.
 * Two simultaneous preload="auto" video downloads + decoders were the
 * single biggest mobile perf cost on the homepage; on a phone the
 * still hero looks essentially identical and TTI / scroll smoothness
 * win the comparison.
 */
export default function HeroBackgroundVideo({
  src,
  poster,
  className = "",
  crossfadeMs = 700,
  warmupMs = 1500,
}: {
  src: string;
  poster?: string;
  className?: string;
  crossfadeMs?: number;
  warmupMs?: number;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const activeRef = useRef<"a" | "b">("a");
  const swappingRef = useRef(false);
  const warmedRef = useRef(false);
  const [enableVideo, setEnableVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    setEnableVideo(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnableVideo(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!enableVideo) return;
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    // Active starts on A. Park B at t=0, paused, but pre-fetched via
    // preload="auto" on the element itself so its first .play() is
    // close to instant.
    a.play().catch(() => {});
    try {
      b.pause();
      b.currentTime = 0;
    } catch {}

    function handleTimeUpdate(this: HTMLVideoElement) {
      if (!this.duration || isNaN(this.duration)) return;

      const isCurrentActive =
        (activeRef.current === "a" && this === a) ||
        (activeRef.current === "b" && this === b);
      if (!isCurrentActive) return;

      const standby = this === a ? b : a;
      if (!standby) return;
      const remaining = this.duration - this.currentTime;

      // Phase 1 — warm up. Start the standby playing well before the
      // swap so its decoder is producing frames by the time we need
      // them. This is the difference that makes the crossfade have no
      // perceptible pause: we never call .play() on a paused video at
      // the moment of swap.
      if (
        !warmedRef.current &&
        !swappingRef.current &&
        remaining < warmupMs / 1000
      ) {
        warmedRef.current = true;
        try {
          standby.currentTime = 0;
          const p = standby.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {}
      }

      // Phase 2 — crossfade.
      if (swappingRef.current) return;
      if (remaining > crossfadeMs / 1000 + 0.05) return;

      swappingRef.current = true;
      activeRef.current = activeRef.current === "a" ? "b" : "a";
      setActive(activeRef.current);

      const outgoing = this;
      window.setTimeout(() => {
        // Phase 3 — rewind + pause the outgoing player so it's ready
        // to be next round's standby. warmed flag clears so the next
        // cycle can re-arm.
        try {
          outgoing.currentTime = 0;
          outgoing.pause();
        } catch {}
        warmedRef.current = false;
        swappingRef.current = false;
      }, crossfadeMs + 100);
    }

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [crossfadeMs, warmupMs, enableVideo]);

  const sharedClass = `absolute inset-0 w-full h-full object-cover transition-opacity ${className}`;
  const sharedStyle: React.CSSProperties = {
    transitionDuration: `${crossfadeMs}ms`,
    transitionTimingFunction: "ease-out",
  };

  return (
    <>
      {/* Always-rendered still — this is what mobile sees, and what
          desktop sees in the brief window before the video element
          decodes its first frame. */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
        />
      )}

      {enableVideo && (
        <>
          <video
            ref={videoARef}
            src={src}
            poster={poster}
            muted
            playsInline
            autoPlay
            preload="auto"
            className={sharedClass}
            style={{ ...sharedStyle, opacity: active === "a" ? 1 : 0 }}
          />
          <video
            ref={videoBRef}
            src={src}
            muted
            playsInline
            preload="auto"
            className={sharedClass}
            style={{ ...sharedStyle, opacity: active === "b" ? 1 : 0 }}
          />
        </>
      )}
    </>
  );
}
