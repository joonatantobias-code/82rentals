import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Founders from "@/components/Founders";
import CTABanner from "@/components/CTABanner";
import { Compass, Heart, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Meistä",
  description:
    "82Rentals on kolmen helsinkiläisen kaverin perustama vesijettivuokraus. Tutustu tiimiin ja tarinaan.",
};

const values = [
  {
    icon: Compass,
    title: "Helppoutta",
    text: "Varaus, toimitus ja palautus suoraviivaisesti. Sinun ei pidä miettiä logistiikkaa.",
    bg: "bg-brand-primary",
  },
  {
    icon: Heart,
    title: "Asiakas ensin",
    text: "Olemme tavoitettavissa koko ajon ajan. Jokainen palaute päätyy oikeasti meidän pöydälle.",
    bg: "bg-brand-turquoise",
  },
  {
    icon: Wrench,
    title: "Kalusto kunnossa",
    text: "Vesijetit huolletaan jokaisen ajon välissä. Vakuutus ja liivit aina mukana.",
    bg: "bg-brand-primary",
  },
];

export default function MeistaPage() {
  return (
    <>
      <PageHero
        eyebrow="Meistä"
        title="Helsinkiläinen kaveriporukka, joka rakastaa vesillä oloa."
        description="Aloitimme 82Rentalsin koska halusimme tehdä Helsingin saaristosta lähemmäksi. Toimitamme vesijetit suoraan sinne missä olet."
        crumbs={[{ label: "Meistä" }]}
      />

      {/* Story */}
      <section className="section">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="section-eyebrow">Tarina</span>
            <h2 className="section-title">Miksi tämä syntyi.</h2>
            <div className="mt-6 space-y-5 text-brand-secondary/80 leading-relaxed text-base sm:text-lg">
              <p>
                82Rentals lähti liikkeelle yksinkertaisesta turhautumisesta.
                Helsinki on saariston ympäröimä, mutta vesille pääseminen on
                aina vaatinut perävaunua, parkkihuolia ja jonotusta vuokraamossa.
              </p>
              <p>
                Halusimme rakentaa palvelun, jossa varaus tehdään minuutissa ja
                vesijetti on paikan päällä silloin kun sinä haluat. Se onnistui
                niin hyvin, että nyt me vain tuomme vesijetin sinulle ja sinä keskityt
                kesän parhaaseen päivään.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white border border-black/5 shadow-soft p-5 sm:p-6"
              >
                <div
                  className={`h-11 w-11 rounded-xl ${v.bg} text-brand-secondary grid place-items-center`}
                >
                  <v.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-brand-secondary mt-4">
                  {v.title}
                </h3>
                <p className="text-sm text-brand-secondary/70 mt-1.5 leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Founders />

      <CTABanner
        title="Tule mukaan vesille."
        subtitle="Varaa Sea-Doo Spark Trixx ja koe Helsingin saaristo uudella tavalla."
      />
    </>
  );
}
