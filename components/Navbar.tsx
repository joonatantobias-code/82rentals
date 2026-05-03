"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/vesijetti", label: "Vesijettimme" },
  { href: "/hinnasto", label: "Hinnasto" },
  { href: "/meista", label: "Meistä" },
  { href: "/yhteystiedot", label: "Yhteystiedot" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-secondary ${
        scrolled ? "py-2 shadow-soft" : "py-3"
      }`}
    >
      {/* Top accent strip — light blue brand line, glossy feel */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-brand-primary/40 pointer-events-none"
      />

      <nav className="relative max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group relative flex items-center"
          aria-label="82Rentals etusivu"
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
            {/* Glossy sweep on hover — masked by the logo's alpha so the
             * shine only travels across the actual artwork, not the
             * surrounding rectangle. */}
            <span
              aria-hidden
              className="logo-shine pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="logo-shine__streak block absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/55 blur-sm group-hover:translate-x-[260%] transition-transform duration-700 ease-out" />
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 lg:gap-9">
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

        <div className="hidden md:block">
          <Link
            href="/varaa"
            className="group relative inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold bg-brand-primary text-brand-secondary shadow-glow transition-all hover:bg-white overflow-hidden"
          >
            <span className="relative z-10">Varaa</span>
            <span className="relative z-10 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
            {/* Shine streak */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/55 blur-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-700 ease-out" />
            </span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl text-white"
          aria-label="Avaa valikko"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-3 rounded-2xl bg-white/97 backdrop-blur-xl shadow-soft p-3 border border-black/5"
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
              <li className="mt-2">
                <Link
                  href="/varaa"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Varaa nyt
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
