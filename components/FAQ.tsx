"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Tarvitsenko ajokortin?",
    a: "Et. Sea-Doo Spark Trixx 2up:in ajamiseen Suomessa ei vaadita erillistä vesikulkuneuvokorttia. Alaikäraja on 18 vuotta ja tarvitset voimassa olevan henkilöllisyystodistuksen. Annamme lyhyen turvaopastuksen ennen jokaista ajoa.",
  },
  {
    q: "Onko se turvallista? Entä vakuutus?",
    a: "Kyllä. Kaikkiin vuokriin sisältyy kattava vakuutus, pelastusliivit ja turvallisuusnaru. Käymme jokaisen ajajan kanssa läpi turvallisen ajon ja reittivalinnat, ja olemme tavoitettavissa puhelimitse koko ajon ajan.",
  },
  {
    q: "Mitä jos sää on huono?",
    a: "Turvallisuus ensin, jos olosuhteet ovat vaaralliset (kova tuuli, myrsky, sankka sumu), siirrämme varauksen ilmaiseksi tai palautamme rahat kokonaan. Kevyt sade ei yleensä ole ongelma.",
  },
  {
    q: "Mikä on peruutusehto?",
    a: "Maksuton peruutus 24 tuntia ennen varauksen alkua. Tämän jälkeen veloitamme 50 %. Säästä johtuvat peruutukset meiltä ovat aina 100 % palautuskelpoisia tai siirrettävissä uuteen aikaan.",
  },
  {
    q: "Minne tarkalleen toimitatte?",
    a: "Mihin tahansa Helsingin rannikkoalueelle, hotellin laiturille, mökille, rannalle tai venesatamaan. Toimitus sisältyy hintaan.",
  },
  {
    q: "Voiko kaksi henkilöä ajaa yhdessä?",
    a: "Kyllä. Spark Trixx on 2up-malli, eli suunniteltu kahdelle ajajalle. Molempien on käytettävä pelastusliivejä (saat ne meiltä).",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
        <div>
          <span className="section-eyebrow">UKK</span>
          <h2 className="section-title">Hyvät kysymykset ansaitsevat selkeät vastaukset.</h2>
          <p className="mt-5 text-brand-secondary/70 text-lg leading-relaxed">
            Jäikö jotain mietityttämään? Laita viestiä, vastaamme yleensä
            minuuteissa kauden aikana.
          </p>
          <a
            href="#footer"
            className="btn-ghost mt-6"
          >
            Ota yhteyttä →
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`card overflow-hidden transition-shadow ${
                  isOpen ? "shadow-glow" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-brand-secondary text-base md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`h-10 w-10 rounded-full grid place-items-center shrink-0 transition-all ${
                      isOpen
                        ? "bg-brand-secondary text-brand-primary rotate-45"
                        : "bg-brand-primary-50 text-brand-secondary"
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-6 text-brand-secondary/75 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
