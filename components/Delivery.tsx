"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { unsplashUrl } from "@/lib/images";

const spots = [
  "Hernesaari",
  "Lauttasaari",
  "Vuosaari",
  "Suomenlinna",
  "Hietaniemi",
  "Kulosaari",
  "Munkkiniemi",
  "Kruunuvuori",
];

export default function Delivery() {
  return (
    <section id="delivery" className="section">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft"
        >
          <Image
            src={unsplashUrl("helsinki1", { w: 1800 })}
            alt="Helsingin rannikko"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-secondary/55" />

          {/* Decorative SVG ping */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary animate-pulse-ring" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-primary" />
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 backdrop-blur-md p-4 text-brand-secondary shadow-soft">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center shrink-0">
                <Truck size={18} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-brand-secondary/65 font-bold">
                  Joustava toimitus
                </p>
                <p className="text-sm font-semibold">
                  Olemme paikalla varaamasi ajan mukaan
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <span className="section-eyebrow">Erottava etumme</span>
          <h2 className="section-title">
            Tuomme vesijetin{" "}
            <span className="relative inline-block text-brand-primary-600">
              sinulle
              <svg
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 w-full h-2 text-brand-turquoise"
                aria-hidden
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            . Minne tahansa Helsingissä.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-secondary/75 leading-relaxed">
            Ei perävaunuja, ei parkkihuolia, ei jonotusta vuokraamossa. Kerro
            missä olet, hotellin laituri, kesämökki tai suosikkirantasi, ja
            saavumme paikalle vesijetti valmiina.
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
            <Card icon={Truck} title="Ovelta vesille" color="bg-brand-primary">
              Tapaamme valitsemassasi paikassa, laituri, ranta tai veneestä.
            </Card>
            <Card
              icon={Clock}
              title="Sinun aikataulullasi"
              color="bg-brand-turquoise"
            >
              Valitse aika, me olemme paikalla. Nouto sujuu yhtä helposti.
            </Card>
          </div>

          <div className="mt-8">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-secondary/65 mb-3">
              Suosittuja toimitusalueita
            </p>
            <div className="flex flex-wrap gap-2">
              {spots.map((spot) => (
                <span
                  key={spot}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-brand-primary/30 text-sm font-medium text-brand-secondary"
                >
                  <MapPin size={12} className="text-brand-primary-600" />
                  {spot}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-secondary text-white text-sm font-semibold">
                + minne tahansa muualle
              </span>
            </div>
          </div>

          <Link href="/varaa" className="btn-primary mt-8">
            Varaa toimitus <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
  color,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl p-5 bg-white border border-black/5 shadow-soft">
      <div className={`h-10 w-10 rounded-xl ${color} text-brand-secondary grid place-items-center`}>
        <Icon size={20} />
      </div>
      <h4 className="font-display font-semibold text-brand-secondary mt-3">
        {title}
      </h4>
      <p className="text-sm text-brand-secondary/70 mt-1.5">{children}</p>
    </div>
  );
}
