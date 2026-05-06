"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seamless looping video. Renders two stacked <video> elements playing
 * the same source and crossfades between them at the loop point, so the
 * end → start transition reads as continuous footage instead of the
 * tiny stutter the native `loop` attribute leaves on most browsers.
 *
 * The active video listens to `timeupdate`; when it's within
 * `crossfadeMs` of its duration it starts the standby video from 0 and
 * the visible layer fades over. Both videos are muted, autoplay-eligible
 * and preload="auto" so the standby is decoder-warm before its turn.
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

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    a.play().catch(() => {});
    b.pause();
    b.currentTime = 0;

    function handleTimeUpdate(this: HTMLVideoElement) {
      if (swappingRef.current) return;
      if (!this.duration || isNaN(this.duration)) return;
      const remaining = this.duration - this.currentTime;
      if (remaining > crossfadeMs / 1000 + 0.05) return;

      // Time to hand off to the other video.
      const incoming = this === a ? b : a;
      if (!incoming) return;
      swappingRef.current = true;
      try {
        incoming.currentTime = 0;
        const p = incoming.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {}

      setActive(this === a ? "b" : "a");

      // After crossfade completes, rewind the outgoing video so it's
      // ready as the next standby. We don't pause it — keeping it
      // running keeps the decoder warm and the next handoff seamless.
      window.setTimeout(() => {
        try {
          this.currentTime = 0;
          this.pause();
        } catch {}
        swappingRef.current = false;
      }, crossfadeMs + 80);
    }

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [crossfadeMs]);

  const sharedClass = `absolute inset-0 w-full h-full object-cover transition-opacity ${className}`;

  return (
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
        style={{
          opacity: active === "a" ? 1 : 0,
          transitionDuration: `${crossfadeMs}ms`,
          transitionTimingFunction: "ease-out",
        }}
      />
      <video
        ref={videoBRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={sharedClass}
        style={{
          opacity: active === "b" ? 1 : 0,
          transitionDuration: `${crossfadeMs}ms`,
          transitionTimingFunction: "ease-out",
        }}
      />
    </>
  );
}
