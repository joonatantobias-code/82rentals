"use client";

import { Star, Shield, Truck, Fuel, LifeBuoy } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

export default function TrustBanner() {
  const t = useT();
  const items = [
    { icon: Star, text: t.trust.rating },
    { icon: Truck, text: t.trust.delivery },
    { icon: Fuel, text: t.trust.fuel },
    { icon: LifeBuoy, text: t.trust.lifeJackets },
    { icon: Shield, text: t.trust.insured },
  ];
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-label="Trust badges"
      className="bg-brand-secondary text-white py-4 overflow-hidden"
    >
      <div className="marquee-track flex w-max gap-12 px-4">
        {loop.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-white/90"
          >
            <item.icon size={16} className="text-brand-primary" />
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
