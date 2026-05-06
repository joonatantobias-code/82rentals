"use client";

import { Star, Gauge, Fuel, LifeBuoy, MapPin } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

export default function TrustBanner() {
  const t = useT();
  const items = [
    { icon: Gauge, text: t.trust.topSpeed },
    { icon: Fuel, text: t.trust.fuel },
    { icon: LifeBuoy, text: t.trust.lifeJackets },
    { icon: Star, text: t.trust.rating },
    { icon: MapPin, text: t.trust.departure },
  ];

  // Two copies of the strip, each with its own internal spacing. The
  // marquee animates from 0 to -50% — exactly one copy's worth — so the
  // moment the first copy slides off the left, the second copy occupies
  // the same visual position as the first did at frame 0. No snap, no
  // mid-content reset.
  const Strip = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div className="flex gap-12 pr-12 shrink-0" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-white/90"
        >
          <item.icon size={16} className="text-brand-primary shrink-0" />
          {item.text}
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Trust badges"
      className="bg-brand-secondary text-white py-4 overflow-hidden"
    >
      <div className="marquee-track flex w-max pl-12">
        <Strip />
        <Strip ariaHidden />
      </div>
    </section>
  );
}
