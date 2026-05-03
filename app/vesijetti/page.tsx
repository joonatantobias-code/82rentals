import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Product from "@/components/Product";
import Anatomy from "@/components/Anatomy";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Sea-Doo Spark Trixx 2up",
  description:
    "Sea-Doo Spark Trixx 2up on leikkisä, kahdelle ajajalle suunniteltu vesijetti. 90 hv Rotax, säädettävä ohjaustanko ja kevyt runko.",
};

const specs = [
  { k: "Moottori", v: "Rotax 900 ACE" },
  { k: "Teho", v: "90 hv" },
  { k: "Henkilömäärä", v: "2" },
  { k: "Paino", v: "n. 195 kg" },
];

export default function VesijettiPage() {
  return (
    <>
      <PageHero
        eyebrow="Kalusto"
        title="Sea-Doo Spark Trixx 2up."
        description="Sea-Doon leikkisin malli. Suunniteltu ajajille, jotka haluavat oikeasti tuntea veden."
        crumbs={[{ label: "Vesijetti" }]}
      />
      <Product />
      <Anatomy />

      <section className="section-tinted">
        <div className="section relative">
          <div className="relative max-w-3xl mb-8">
            <span className="section-eyebrow">Tekniset tiedot</span>
            <h2 className="section-title">Numerot lyhyesti.</h2>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {specs.map((row) => (
              <div
                key={row.k}
                className="rounded-2xl bg-white p-5 border border-brand-primary/20 shadow-soft"
              >
                <dt className="text-xs uppercase tracking-wider text-brand-secondary/60 font-bold">
                  {row.k}
                </dt>
                <dd className="font-display text-xl sm:text-2xl font-extrabold text-brand-secondary mt-1">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABanner
        title="Aja sitä, älä vain katso kuvia."
        subtitle="Varaa Sea-Doo Spark Trixx ja koe miksi tämä on Sea-Doon leikkisin malli."
      />
    </>
  );
}
