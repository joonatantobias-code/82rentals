"use client";

import { Snowflake } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

/** Koko sivuston bänneri: kausi on päättynyt. Kiinteänä heti navin alla,
 *  joten se näkyy jokaisella sivulla ja joka scroll-asennossa. */
export default function SeasonClosedBanner() {
  const t = useT();
  return (
    <div className="not-print fixed top-16 left-0 right-0 z-40 bg-brand-secondary text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-4 py-2.5 text-center text-sm font-semibold">
        <Snowflake size={16} className="shrink-0 text-brand-primary" aria-hidden />
        <span>{t.seasonClosed.banner}</span>
      </div>
    </div>
  );
}
