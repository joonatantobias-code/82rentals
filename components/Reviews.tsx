"use client";

import { useEffect, useRef } from "react";
import BrushUnderline from "@/components/BrushUnderline";
import { useT } from "@/components/LocaleProvider";

/**
 * Trustindex widget ID for the 82Rentals Google Reviews feed.
 * Owned by us at admin.trustindex.io. The loader.js script reads
 * this from its own URL's querystring and renders the widget
 * right after the <script> element it finds — so the script has
 * to live INSIDE the target container, not at the top of the
 * document, for the reviews to appear in the right place.
 */
const TRUSTINDEX_WIDGET_ID = "142436872a95188bcc068c5bc4a";

export default function Reviews() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    // Prevent duplicate injection on Fast Refresh / React Strict
    // Mode double-mount.
    if (host.querySelector("script[data-ti-loader]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.defer = true;
    s.src = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;
    s.setAttribute("data-ti-loader", "true");
    host.appendChild(s);
  }, []);

  return (
    <section id="reviews" className="section relative">
      <div className="blob-primary w-[300px] h-[300px] -top-10 left-0" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-left max-w-2xl mb-10 md:mb-12">
          <span className="section-eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title mt-2">
            <span className="relative inline-block">
              {t.reviews.title}
              <BrushUnderline variant="spray" delay={0.4} thickness={9} />
            </span>
          </h2>
        </div>

        {/* Trustindex injects the rendered widget after its own
            <script> child element inside this container. Padding
            and minHeight reserve some vertical space so the
            section doesn't pop as the widget hydrates. */}
        <div
          ref={containerRef}
          className="relative min-h-[480px]"
          aria-label="Google-arvostelut"
        />
      </div>
    </section>
  );
}
