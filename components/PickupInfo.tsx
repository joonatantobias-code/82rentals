"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { PICKUP, GOOGLE_MAPS_URL, APPLE_MAPS_URL } from "@/lib/pickup";

type Props = {
  /** Show the OpenStreetMap iframe. Default true. */
  withMap?: boolean;
  /** Optional: override the description. */
  description?: string;
  /** Show the "muu paikka" contact card. Default true. */
  withContact?: boolean;
  /** Tighter heading style. */
  compact?: boolean;
};

const DEFAULT_DESC =
  "Lähtöpaikka on Kipparlahden satama Helsingissä. Avaa reittiohjeet alta, Google ja Apple Maps ohjaavat suoraan paikalle.";

export default function PickupInfo({
  withMap = true,
  withContact = true,
  description,
  compact,
}: Props) {
  const dLat = 0.0035;
  const dLng = 0.0065;
  const bbox = [
    PICKUP.lng - dLng,
    PICKUP.lat - dLat,
    PICKUP.lng + dLng,
    PICKUP.lat + dLat,
  ].join(",");
  const src =
    `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
    `&layer=mapnik&marker=${PICKUP.lat},${PICKUP.lng}`;

  return (
    <div className="space-y-3">
      {withMap && (
        <div className="rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-soft">
          <iframe
            title={PICKUP.name}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[260px] sm:h-[320px] bg-brand-primary-50 block"
          />
        </div>
      )}

      <div className="rounded-2xl border-2 border-brand-primary/40 bg-brand-primary-50 p-4">
        <div className={`flex items-start gap-3 ${compact ? "items-center" : ""}`}>
          <MapPin size={20} className="text-brand-primary-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-display font-extrabold text-brand-secondary text-lg">
              {PICKUP.name}
            </div>
            <div className="text-sm text-brand-secondary/85 mt-0.5">
              {PICKUP.area}
            </div>
          </div>
        </div>
        <p className="text-sm text-brand-secondary/75 mt-3 leading-relaxed">
          {description ?? DEFAULT_DESC}
        </p>
        {/* Both map links share one identical button style so neither
            reads as the "recommended" or default option — they're
            equivalent ways to open the same destination. Hover swaps
            the surface to white with a brand-primary ring, matching
            the rest of the site's navy → white treatment. */}
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
          >
            <MapPin size={14} /> Avaa Google Maps
          </a>
          <a
            href={APPLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
          >
            <MapPin size={14} /> Avaa Apple Maps
          </a>
        </div>
      </div>

      {withContact && (
        <div className="rounded-2xl border-2 border-brand-primary/30 p-4 bg-white">
          <div className="font-display font-bold text-brand-secondary">
            Tarvitsetko toimituksen muualle?
          </div>
          <p className="text-sm text-brand-secondary/70 mt-1 leading-relaxed">
            Onnistuu lisämaksusta sopimuksen mukaan. Soita tai laita sähköpostia ennen varausta, niin sovitaan paikka ja hinta.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="tel:+358401866664"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
            >
              <Phone size={14} /> +358 40 186 6664
            </a>
            <a
              href="mailto:82rentals.info@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
            >
              <Mail size={14} /> 82rentals.info@gmail.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
