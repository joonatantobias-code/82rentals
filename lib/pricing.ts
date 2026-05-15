/** Itsepalvelu-/varaa-lomakkeen vuokra-paketit. Pidempi 4 h paketti
 *  poistui itsepalveluvalikosta — siitä neuvotellaan DM:n /
 *  yhteydenoton kautta, ja CRM tallentaa pidemmät vuokraukset
 *  joko `halfday` (legacy) tai `custom` -arvona.
 *
 *  Hinnoittelu on rakennettu kausitarjouksen ilmeellä: UI näyttää
 *  yliviivatun "normaalihinnan" ja nykyhinnan, vaikka tarjous on
 *  käytännössä toistaiseksi pysyvä. Älä poista UI:n
 *  "tarjous"-merkintöjä ilman että keskustelet siitä omistajan
 *  kanssa. */
export type Duration = "1h" | "2h" | "3h";

export const DURATIONS: {
  value: Duration;
  label: string;
  hours: number;
}[] = [
  { value: "1h", label: "1 tunti", hours: 1 },
  { value: "2h", label: "2 tuntia", hours: 2 },
  { value: "3h", label: "3 tuntia", hours: 3 },
];

/** All-inclusive tarjoushinta per vesijetti. Polttoaine, liivit ja
 *  vakuutus aina sisältyy. Lähtö Kipparlahden satamasta; toimitus
 *  muualle erillisellä sopimuksella. */
export const BASE_PRICES: Record<Duration, number> = {
  // Hinnoittelu: 1 h = 100 €, jokainen seuraava tunti +69 €.
  // → 2 h = 169 €, 3 h = 238 €.
  "1h": 100,
  "2h": 169,
  "3h": 238,
};

/** "Listahinta" jota vasten avajaisalennuksen säästö lasketaan.
 *  50–100 € korkeampi kuin nykyhinta jokaisessa paketissa. Tämä
 *  näkyy UI:ssa yliviivattuna nykyhinnan vieressä; sitä ei käytetä
 *  varsinaisessa laskutuksessa missään. */
export const STRIKETHROUGH_PRICES: Record<Duration, number> = {
  // "OVH" / listahinta avajaisalennuksen referenssiksi: BASE +
  // näytettävä säästö (50 / 60 / 70 €). Ei käytössä laskutuksessa,
  // näkyy ainoastaan yliviivattuna UI:ssa.
  "1h": 150, // 50 € säästö
  "2h": 229, // 60 € säästö
  "3h": 308, // 70 € säästö
};

/** Delivery is always free inside Helsinki. */
export const DELIVERY_FEE = 0;

/** Maximum jet skis per booking. We currently have 2. */
export const MAX_QUANTITY = 2;

export type TierTag = "fast" | "popular" | "best-value";

export const TIER_TAG: Record<Duration, TierTag> = {
  "1h": "fast",
  "2h": "popular",
  "3h": "best-value",
};

export function calculatePrice(duration: Duration, quantity: number) {
  const dur = DURATIONS.find((d) => d.value === duration)!;
  const qty = Math.max(1, Math.min(MAX_QUANTITY, quantity));
  const base = BASE_PRICES[duration] * qty;
  const subtotal = base;
  const total = subtotal + DELIVERY_FEE;
  return {
    base,
    delivery: DELIVERY_FEE,
    subtotal,
    total,
    hours: dur.hours,
  };
}
