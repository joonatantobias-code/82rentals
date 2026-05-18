"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  // Set to true once Trustindex has actually injected the widget
  // markup into the container. Until then we keep the widget
  // block invisible (opacity 0) so the reveal animation runs
  // when the real content lands instead of on an empty box.
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    // Prevent duplicate injection on Fast Refresh / React Strict
    // Mode double-mount.
    if (host.querySelector("script[data-ti-loader]")) return;

    // MutationObserver: Trustindex's loader inserts the widget
    // DOM as siblings of its own <script> inside this container.
    // The moment any non-script element appears we know the
    // widget has hydrated, and we trigger the reveal animation.
    const observer = new MutationObserver(() => {
      const hasContent = Array.from(host.children).some(
        (el) => el.tagName !== "SCRIPT",
      );
      if (hasContent) {
        setWidgetReady(true);
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });

    const s = document.createElement("script");
    s.async = true;
    s.defer = true;
    s.src = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;
    s.setAttribute("data-ti-loader", "true");
    host.appendChild(s);

    // Safety net: if for some reason the widget never injects
    // anything detectable (slow CDN, ad-blocker, or Trustindex
    // changing their DOM shape), still reveal the container
    // after 4 s so it isn't permanently invisible.
    const fallback = window.setTimeout(() => setWidgetReady(true), 4000);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="reviews" className="section relative">
      <div className="blob-primary w-[300px] h-[300px] -top-10 left-0" />
      <div className="blob-turquoise w-[260px] h-[260px] bottom-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading block — fades in from below as the section
            scrolls into view, the same motion used by every
            other section on the page. */}
        <motion.div
          className="text-left max-w-2xl mb-10 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title mt-2">
            <span className="relative inline-block">
              {t.reviews.title}
              <BrushUnderline variant="spray" delay={0.4} thickness={9} />
            </span>
          </h2>
        </motion.div>

        {/* Reviews block — starts invisible, fades + slides up
            once Trustindex has finished injecting the widget.
            The spring-out cubic-bezier matches the easing used
            by Modal, BookingModule and the rest of the brand
            motion vocabulary, so the reviews "settle" rather
            than snap. */}
        <motion.div
          ref={containerRef}
          className="relative min-h-[480px]"
          aria-label="Google-arvostelut"
          initial={{ opacity: 0, y: 32 }}
          animate={{
            opacity: widgetReady ? 1 : 0,
            y: widgetReady ? 0 : 32,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            // Small breath after the widget hydrates so the
            // reveal feels deliberate, not a frame-immediate
            // pop.
            delay: widgetReady ? 0.12 : 0,
          }}
        />
      </div>
    </section>
  );
}
