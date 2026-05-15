"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/components/LocaleProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Live countdown to the end of the current calendar week, defined
 * as Sunday 23:59:59. Avajaisalennus deadline resets every Monday
 * 00:00 to the upcoming Sunday, so the bar always shows a few days
 * left no matter when the visitor lands. Server render uses null so
 * the SSR HTML doesn't mismatch the first client paint.
 */
function useEndOfWeekCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    // Tick every second so the seconds digit visibly ticks — a
    // running clock is the whole point of the marquee countdown.
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const d = new Date(now);
  // getDay: Sun=0, Mon=1, ..., Sat=6. We want to reach the upcoming
  // Sunday 23:59:59.999. If today IS Sunday, target is today end.
  const dow = d.getDay();
  const daysUntilSunday = dow === 0 ? 0 : 7 - dow;
  const target = new Date(d);
  target.setDate(d.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 999);

  const remainingMs = Math.max(0, target.getTime() - now);
  const days = Math.floor(remainingMs / 86_400_000);
  const hours = Math.floor((remainingMs % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Navbar() {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const countdown = useEndOfWeekCountdown();

  // Four-unit countdown — days, hours, minutes, seconds rendered
  // as separate chips so each value reads as its own quantity.
  // Server (and pre-mount client) gets a placeholder pad ("—") so
  // the marquee width doesn't jump when the real numbers land.
  const countdownUnits = countdown
    ? [
        { value: pad2(countdown.days), unit: t.announcement.countdownDay },
        { value: pad2(countdown.hours), unit: t.announcement.countdownHour },
        { value: pad2(countdown.minutes), unit: t.announcement.countdownMin },
        { value: pad2(countdown.seconds), unit: "s" },
      ]
    : [
        { value: "—", unit: t.announcement.countdownDay },
        { value: "—", unit: t.announcement.countdownHour },
        { value: "—", unit: t.announcement.countdownMin },
        { value: "—", unit: "s" },
      ];

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer when navigating to a new route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/vesijettimme", label: t.nav.vesijetti },
    { href: "/hinnasto", label: t.nav.hinnasto },
    { href: "/meista", label: t.nav.meista },
    { href: "/ukk", label: t.nav.ukk },
    { href: "/yhteystiedot", label: t.nav.yhteystiedot },
  ];

  return (
    <header
      className={`not-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      {/* Avajaisalennus-palkki — only renders on the home page.
          Other pages get the bare navbar so the ribbon doesn't
          dominate every screen. Marquee mirrors TrustBanner's
          structure (two identical copies of a strip translating
          -50%) so both ribbons feel like one family at the same
          visual scroll speed. */}
      {isHome && (
        <Link
          href="/varaa"
          className="group block bg-brand-primary text-brand-secondary overflow-hidden py-2"
          aria-label={t.announcement.cta}
        >
          {/* The ribbon segment is much wider than a TrustBanner
              strip (countdown chips eat horizontal space), so even
              with the same .marquee-track class the px/sec rate
              looks faster than the trust ribbon below. Override
              the duration so the ribbon settles into the same
              visual pace — ~45 px/sec, matching TrustBanner. */}
          <div
            className="marquee-track flex w-max items-center whitespace-nowrap group-hover:[animation-play-state:paused] pl-8"
            style={{ animationDuration: "55s" }}
          >
            <RibbonStrip
              eyebrow={t.announcement.eyebrow}
              prefix={t.announcement.countdownPrefix}
              units={countdownUnits}
              note={t.announcement.laterNote}
            />
            <RibbonStrip
              eyebrow={t.announcement.eyebrow}
              prefix={t.announcement.countdownPrefix}
              units={countdownUnits}
              note={t.announcement.laterNote}
              ariaHidden
            />
          </div>
        </Link>
      )}

      <div
        className={`relative bg-brand-secondary transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-brand-primary/40 pointer-events-none"
        />

      <nav className="relative max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-3 lg:gap-6">
        <Link
          href="/"
          className="group relative flex items-center"
          aria-label="82Rentals"
        >
          <span className="relative h-12 w-[140px] sm:h-14 sm:w-[170px] shrink-0">
            <Image
              src="/logo.png"
              alt="82Rentals"
              fill
              sizes="170px"
              className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.04]"
              priority
              unoptimized
            />
            <span aria-hidden className="logo-shine" />
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors relative ${
                    active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full bg-brand-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher tone="dark" />
          </div>

          <Link
            href="/varaa"
            className="hidden md:inline-flex group relative items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold bg-brand-primary text-brand-secondary shadow-glow transition-all hover:bg-white overflow-hidden"
          >
            <span className="relative z-10">{t.common.bookShort}</span>
            <span className="relative z-10 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/55 blur-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-700 ease-out" />
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative h-11 w-11 rounded-xl text-white grid place-items-center"
            aria-label={t.common.open}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop closes the drawer when tapped */}
            <motion.button
              type="button"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-brand-secondary/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl bg-white shadow-soft p-3 border border-black/5 z-50"
            >
              <ul className="flex flex-col">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3.5 rounded-xl font-medium ${
                          active
                            ? "bg-brand-primary-50 text-brand-secondary"
                            : "text-brand-secondary/85 hover:bg-brand-primary-50"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 px-1 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/55">
                  {t.common.langLabel}
                </span>
                <LanguageSwitcher tone="light" />
              </div>

              <Link
                href="/varaa"
                onClick={() => setOpen(false)}
                className="btn-primary w-full mt-3"
              >
                {t.common.bookNow}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * One half of the marquee ribbon. Mirrors TrustBanner's Strip
 * structure: a row of segments with their own internal spacing,
 * rendered twice in the track. After translateX(-50%) the second
 * strip occupies the visual position the first held at frame 0,
 * so the loop seam is invisible. Two segments per strip keeps the
 * track wide enough to fill the viewport on common displays.
 */
function RibbonStrip({
  eyebrow,
  prefix,
  units,
  note,
  ariaHidden,
}: {
  eyebrow: string;
  prefix: string;
  units: Array<{ value: string; unit: string }>;
  note: string;
  ariaHidden?: boolean;
}) {
  return (
    <div className="flex gap-10 pr-10 shrink-0" aria-hidden={ariaHidden}>
      <RibbonSegment
        eyebrow={eyebrow}
        prefix={prefix}
        units={units}
        note={note}
      />
      <RibbonSegment
        eyebrow={eyebrow}
        prefix={prefix}
        units={units}
        note={note}
      />
    </div>
  );
}

/**
 * One segment: sparkles glyph, eyebrow, countdown unit chips,
 * later-date reassurance. The countdown renders the four units
 * (days / hours / minutes / seconds) as separate inverted chips
 * so each quantity reads as its own number, the way real
 * countdown widgets show them.
 */
function RibbonSegment({
  eyebrow,
  prefix,
  units,
  note,
}: {
  eyebrow: string;
  prefix: string;
  units: Array<{ value: string; unit: string }>;
  note: string;
}) {
  return (
    <span className="inline-flex items-center gap-3 text-[12px] sm:text-[13px] font-bold leading-none whitespace-nowrap">
      <Sparkles size={13} className="shrink-0 opacity-80" />
      <span className="uppercase tracking-[0.18em] font-extrabold">
        {eyebrow}
      </span>
      <span className="opacity-50">·</span>
      {/* Countdown chips — red on sky so the deadline reads as a
          warning, not just decorative. Each chip carries a thin
          inner outline for extra punch, and the last (seconds)
          chip pulses very subtly via animate-pulse so the eye
          keeps glancing back to it. */}
      <span className="inline-flex items-center gap-1.5">
        <span className="uppercase tracking-[0.14em] text-[10px] font-extrabold text-red-700">
          {prefix}
        </span>
        {units.map((u, i) => {
          const isSeconds = i === units.length - 1;
          return (
            <span
              key={i}
              className={`inline-flex items-baseline gap-0.5 rounded-md bg-red-600 text-white px-1.5 py-1 ring-1 ring-inset ring-white/25 shadow-[0_1px_0_0_rgba(0,0,0,0.15)] ${
                isSeconds ? "animate-pulse" : ""
              }`}
            >
              <span className="text-[13px] sm:text-[14px] font-extrabold tabular-nums leading-none">
                {u.value}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.08em] opacity-85 leading-none">
                {u.unit}
              </span>
            </span>
          );
        })}
      </span>
      <span className="opacity-50">·</span>
      <span className="font-medium opacity-90">{note}</span>
    </span>
  );
}
