"use client";

import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingModule from "@/components/BookingModule";
import { Shield, Truck, Clock, Phone } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

const REASSURANCE_ICONS = [Shield, Truck, Clock, Phone];

export default function VaraaContent() {
  const t = useT();
  const page = t.pages.varaa;
  const reassurances = REASSURANCE_ICONS.map((icon, i) => ({
    icon,
    title: page.reassurances[i].title,
    text: page.reassurances[i].text,
  }));
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroDesc}
        crumbs={[{ label: t.footer.varaaLink }]}
      />

      <Suspense fallback={null}>
        <BookingModule />
      </Suspense>

      <section className="section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reassurances.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl bg-white p-6 border border-black/5 shadow-soft"
            >
              <div className="h-11 w-11 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center">
                <r.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-brand-secondary mt-4">
                {r.title}
              </h3>
              <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
