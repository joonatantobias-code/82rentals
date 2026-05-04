"use client";

import PageHero from "@/components/PageHero";
import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/components/LocaleProvider";

function TikTok({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.42-2.46V9.79a5.82 5.82 0 0 0-5.43 9.36 5.83 5.83 0 0 0 9.18-1.31 5.82 5.82 0 0 0 .76-2.84V9.39a7.36 7.36 0 0 0 4.31 1.39V7.69a4.32 4.32 0 0 1-2.91-1.87Z" />
    </svg>
  );
}

export default function YhteystiedotContent() {
  const t = useT();
  const page = t.pages.yhteystiedot;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: page.title }]}
      />

      <section className="section">
        <div className="grid lg:grid-cols-2 gap-5">
          <ContactRow
            icon={Phone}
            label={t.common.phone}
            value="+358 40 186 6664"
            href="tel:+358401866664"
            hint={page.phoneHint}
            color="bg-brand-primary"
          />
          <ContactRow
            icon={Mail}
            label={t.common.email}
            value="82rentals.info@gmail.com"
            href="mailto:82rentals.info@gmail.com"
            hint={page.emailHint}
            color="bg-brand-turquoise"
          />
          <ContactRow
            icon={Instagram}
            label={t.common.instagram}
            value="@82rentals"
            href="https://instagram.com/82rentals"
            hint={page.igHint}
            color="bg-brand-secondary"
            iconClass="text-white"
          />
          <ContactRow
            customIcon={<TikTok size={20} />}
            label={t.common.tiktok}
            value="@82rentals"
            href="https://www.tiktok.com/@82rentals"
            hint={page.tiktokHint}
            color="bg-brand-secondary"
            iconClass="text-white"
          />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-brand-secondary text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute inset-0 pattern-grid opacity-25 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider">
                <MapPin size={14} />
                {t.common.location}
              </div>
              <h3 className="font-display text-xl font-bold mt-2">
                {page.locationTitle}
              </h3>
              <p className="text-white/80 text-sm mt-2 leading-relaxed">
                {page.locationBody}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-primary-50 border border-brand-primary/30 p-6 sm:p-7">
            <div className="flex items-center gap-2 text-brand-secondary/70 text-xs font-bold uppercase tracking-wider">
              <Clock size={14} className="text-brand-primary-600" />
              {t.common.season}
            </div>
            <h3 className="font-display text-xl font-bold text-brand-secondary mt-2">
              {page.seasonTitle}
            </h3>
            <p className="text-brand-secondary/70 text-sm mt-2 leading-relaxed">
              {page.seasonBody}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  customIcon,
  label,
  value,
  href,
  hint,
  color,
  iconClass = "text-brand-secondary",
}: {
  icon?: LucideIcon;
  customIcon?: React.ReactNode;
  label: string;
  value: string;
  href: string;
  hint: string;
  color: string;
  iconClass?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-black/5 shadow-soft hover:-translate-y-1 hover:shadow-glow transition-all"
    >
      <span
        className={`h-14 w-14 rounded-xl ${color} ${iconClass} grid place-items-center shrink-0 group-hover:scale-110 transition-transform`}
      >
        {customIcon ?? (Icon ? <Icon size={22} /> : null)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary/60">
          {label}
        </p>
        <p className="font-display text-lg font-bold text-brand-secondary mt-0.5 truncate group-hover:text-brand-primary-600 transition-colors">
          {value}
        </p>
        <p className="text-xs text-brand-secondary/55 mt-0.5">{hint}</p>
      </div>
    </a>
  );
}
