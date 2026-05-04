"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { GeoBurst, FloatingShapes } from "@/components/Decorations";
import { useT } from "@/components/LocaleProvider";

function TikTok({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="relative bg-brand-secondary text-white mt-12 overflow-hidden"
    >
      <div className="h-1 bg-brand-primary" />
      <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none" />

      <GeoBurst className="hidden md:block absolute -right-12 top-4 w-[460px] h-[460px] opacity-30 pointer-events-none" />
      <FloatingShapes className="hidden md:block absolute -left-10 bottom-0 w-[380px] h-[380px] opacity-25 pointer-events-none" />
      <span
        aria-hidden
        className="num82-outline-dark hidden md:block absolute -bottom-12 right-4 lg:right-12 font-display font-extrabold text-[14rem] lg:text-[18rem] leading-none tracking-tighter select-none pointer-events-none"
      >
        82
      </span>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block" aria-label="82Rentals">
            <span className="relative block h-20 w-[220px]">
              <Image
                src="/logo.png"
                alt="82Rentals"
                fill
                sizes="220px"
                className="object-contain object-left"
                unoptimized
              />
            </span>
          </Link>
          <p className="mt-5 text-white/75 max-w-md leading-relaxed">
            {t.footer.tagline}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com/82rentals"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-xl bg-white/10 hover:bg-brand-primary hover:text-brand-secondary text-white grid place-items-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@82rentals"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-xl bg-white/10 hover:bg-brand-primary hover:text-brand-secondary text-white grid place-items-center transition-colors"
              aria-label="TikTok"
            >
              <TikTok size={18} />
            </a>
            <a
              href="tel:+358401866664"
              className="h-11 w-11 rounded-xl bg-white/10 hover:bg-brand-primary hover:text-brand-secondary text-white grid place-items-center transition-colors"
              aria-label={t.common.phone}
            >
              <Phone size={18} />
            </a>
            <a
              href="mailto:82rentals.info@gmail.com"
              className="h-11 w-11 rounded-xl bg-white/10 hover:bg-brand-primary hover:text-brand-secondary text-white grid place-items-center transition-colors"
              aria-label={t.common.email}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">{t.footer.pages}</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/vesijetti" className="hover:text-brand-primary transition-colors">
                {t.nav.vesijetti}
              </Link>
            </li>
            <li>
              <Link href="/hinnasto" className="hover:text-brand-primary transition-colors">
                {t.nav.hinnasto}
              </Link>
            </li>
            <li>
              <Link href="/meista" className="hover:text-brand-primary transition-colors">
                {t.nav.meista}
              </Link>
            </li>
            <li>
              <Link href="/ukk" className="hover:text-brand-primary transition-colors">
                {t.footer.faqLink}
              </Link>
            </li>
            <li>
              <Link href="/varaa" className="hover:text-brand-primary transition-colors">
                {t.footer.varaaLink}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">{t.footer.contact}</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-brand-primary mt-0.5" />
              <span>{t.footer.city}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="text-brand-primary mt-0.5" />
              <a
                href="tel:+358401866664"
                className="hover:text-brand-primary transition-colors"
              >
                +358 40 186 6664
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="text-brand-primary mt-0.5" />
              <a
                href="mailto:82rentals.info@gmail.com"
                className="hover:text-brand-primary transition-colors"
              >
                82rentals.info@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 text-xs text-white/55 text-center md:text-left">
          © {year} 82Rentals Oy. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
