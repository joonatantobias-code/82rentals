import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingModule from "@/components/BookingModule";
import { Shield, Truck, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Varaa vesijetti",
  description:
    "Varaa Sea-Doo Spark Trixx 60 sekunnissa. Valitse aika, kesto ja toimituspaikka, me hoidamme loput.",
};

const reassurances = [
  {
    icon: Shield,
    title: "Maksuton peruutus",
    text: "24 h ennen varauksen alkua kuluitta.",
  },
  {
    icon: Truck,
    title: "Toimitus mukana",
    text: "Helsingin alueella aina hintaan kuuluen.",
  },
  {
    icon: Clock,
    title: "Joustava ajankohta",
    text: "Aamusta iltaan, sinun aikataulullasi.",
  },
  {
    icon: Phone,
    title: "Vahvistus 30 min",
    text: "Otamme yhteyttä puhelimitse heti.",
  },
];

export default function VaraaPage() {
  return (
    <>
      <PageHero
        eyebrow="Varaus"
        title="Varaa vesijetti 60 sekunnissa."
        description="Valitse päivä, kesto ja paikka, me hoidamme toimituksen, polttoaineen, liivit ja vakuutuksen."
        crumbs={[{ label: "Varaa" }]}
      />

      <BookingModule />

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
