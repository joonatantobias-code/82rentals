"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/components/LocaleProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      {/* Avajaisalennus-palkki — thin strip above the main nav row.
          Keeps showing while scrolled so the discount is always
          visible. Mobile compresses to one short line; desktop
          shows the full three-price headline + a small CTA link. */}
      <Link
        href="/varaa"
        className="group block bg-brand-primary text-brand-secondary"
        aria-label={t.announcement.cta}
      >
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-1.5 sm:py-2 flex items-center justify-center gap-2 sm:gap-3 text-center">
          <Sparkles size={14} className="shrink-0" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-tight leading-tight">
            <span className="sm:hidden">{t.announcement.mobileShort}</span>
            <span className="hidden sm:inline">
              <span className="uppercase tracking-[0.14em] text-[11px] font-extrabold mr-2 opacity-75">
                {t.announcement.eyebrow}
              </span>
              <span className="tabular-nums">{t.announcement.headline}</span>
              <span className="hidden lg:inline opacity-70 ml-3 font-medium">
                · {t.announcement.tagline}
              </span>
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[12px] font-bold ml-2 group-hover:translate-x-0.5 transition-transform">
            {t.announcement.cta} <ArrowRight size={13} />
          </span>
        </div>
      </Link>

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
