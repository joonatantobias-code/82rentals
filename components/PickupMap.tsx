"use client";

import { PICKUP } from "@/lib/pickup";

/**
 * Embedded OpenStreetMap with a single marker at the pickup location.
 * Iframe-based so there is no JS map library lifecycle to manage and the
 * tile rendering can never glitch out during step transitions.
 */
export default function PickupMap() {
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
    <div className="relative rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-soft">
      <iframe
        title={PICKUP.name}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[280px] sm:h-[340px] bg-brand-primary-50 block"
      />
    </div>
  );
}
