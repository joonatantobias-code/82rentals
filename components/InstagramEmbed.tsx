"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: { process(): void };
    };
  }
}

/**
 * Renders a single Instagram post embed via the official widget.
 *
 * The widget script (//www.instagram.com/embed.js) is loaded once
 * per page by <InstagramEmbedScript /> at the top of the page that
 * uses any embeds. Each <InstagramEmbed> component mounts a
 * blockquote with the permalink, then triggers
 * window.instgrm.Embeds.process() so the script transforms the
 * blockquote into a live iframe.
 *
 * The rendered iframe shows the actual video, caption, profile
 * name + avatar, like count, comment preview, and a "View on
 * Instagram" link — all pulled live from Instagram, no API token
 * required.
 */
export function InstagramEmbed({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // If embed.js already loaded, ask it to reprocess (will find
    // and transform this blockquote). If not yet loaded, the
    // <Script onLoad> hook below will trigger it on first load.
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <blockquote
      ref={ref}
      className={`instagram-media ${className ?? ""}`}
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: "16px",
        boxShadow:
          "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: 0,
        maxWidth: "540px",
        minWidth: "300px",
        padding: 0,
        width: "100%",
      }}
    />
  );
}

/**
 * One-time loader for Instagram's embed.js. Rendered once per
 * page that has any <InstagramEmbed /> on it. Idempotent — the
 * script itself no-ops if loaded twice, but we still gate via
 * the global flag so multiple SocialFeed instances don't fight.
 */
let scriptInjected = false;
export function InstagramEmbedScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (scriptInjected) {
      // Script already injected by a previous mount — re-process
      // any blockquotes mounted since.
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
      }
      return;
    }
    scriptInjected = true;
    const s = document.createElement("script");
    s.src = "//www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => {
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(s);
  }, []);
  return null;
}
