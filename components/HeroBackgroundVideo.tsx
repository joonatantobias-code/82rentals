"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seamless looping background video.
 *
 * Strategy: render two <video> elements playing the same source, both
 * with the native `loop` attribute. They play continuously and we never
 * pause them — instead we seed video B at duration/2 the first time the
 * metadata is available, so the two players run in lock-step but offset
 * by half the clip. When the visible video gets near its loop point we
 * crossfade opacity to the other one, which is already mid-playback and
 * decoder-warm, so the handoff has no startup delay.
 *
 * Each player still hits its own loop seam, but only while it's the
 * hidden one (opacity 0), so the seam is invisible.
 */
export default function HeroBackgroundVideo({
  src,
  poster,
  className = "",
  crossfadeMs = 700,
}: {
  src: string;
  poster?: string;
  className?: string;
  crossfadeMs?: number;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const swappingRef = useRef(false);
  const offsetAppliedRef = useRef(false);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    // Best-effort kickoff for both. Browsers may not honour autoplay if
    // the user just landed; we call play() explicitly so the standby
    // (B) is also actively decoding before its time comes.
    a.play().catch(() => {});
    b.play().catch(() => {});

    function applyOffset() {
      if (offsetAppliedRef.current) return;
      const dur = (a as HTMLVideoElement).duration;
      if (!dur || isNaN(dur) || dur <= 0) return;
      offsetAppliedRef.current = true;
      try {
        // Seed B halfway through the clip so the two players are always
        // half a duration apart. When A is near its end, B is mid-clip.
        (b as HTMLVideoElement).currentTime = dur / 2;
      } catch {}
    }

    function onLoadedMetadata() {
      applyOffset();
    }

    if (a.readyState >= 1) applyOffset();
    a.addEventListener("loadedmetadata", onLoadedMetadata);

    function handleTimeUpdate(this: HTMLVideoElement) {
      if (swappingRef.current) return;
      if (!this.duration || isNaN(this.duration)) return;
      // Only the currently visible video should trigger a swap.
      const isCurrentActive =
        (active === "a" && this === a) || (active === "b" && this === b);
      if (!isCurrentActive) return;

      const remaining = this.duration - this.currentTime;
      if (remaining > crossfadeMs / 1000 + 0.05) return;

      swappingRef.current = true;
      setActive((curr) => (curr === "a" ? "b" : "a"));
      window.setTimeout(() => {
        swappingRef.current = false;
      }, crossfadeMs + 80);
    }

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      a.removeEventListener("loadedmetadata", onLoadedMetadata);
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [crossfadeMs, active]);

  const sharedClass = `absolute inset-0 w-full h-full object-cover transition-opacity ${className}`;
  const sharedStyle = {
    transitionDuration: `${crossfadeMs}ms`,
    transitionTimingFunction: "ease-out",
  } as React.CSSProperties;

  return (
    <>
      <video
        ref={videoARef}
        src={src}
        poster={poster}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className={sharedClass}
        style={{ ...sharedStyle, opacity: active === "a" ? 1 : 0 }}
      />
      <video
        ref={videoBRef}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className={sharedClass}
        style={{ ...sharedStyle, opacity: active === "b" ? 1 : 0 }}
      />
    </>
  );
}
