export type Duration = "1h" | "2h" | "halfday" | "fullday";

export const DURATIONS: {
  value: Duration;
  label: string;
  hours: number;
}[] = [
  { value: "1h", label: "1 tunti", hours: 1 },
  { value: "2h", label: "2 tuntia", hours: 2 },
  { value: "halfday", label: "Puoli päivää (4h)", hours: 4 },
  { value: "fullday", label: "Koko päivä (8h)", hours: 8 },
];

/** Vuokrahinta per vesijetti (ilman bensaa). */
export const BASE_PRICES: Record<Duration, number> = {
  "1h": 119,
  "2h": 199,
  halfday: 349,
  fullday: 599,
};

/** Bensaveloitus euroina per käytetty tunti per vesijetti. */
export const FUEL_PER_HOUR_EUR = 30;

/** Toimitus on aina ilmainen Helsingin sisällä. */
export const DELIVERY_FEE = 0;

/** Maksimi vesijettimäärä yhteen varaukseen. Meillä on tällä hetkellä 2. */
export const MAX_QUANTITY = 2;

export function calculatePrice(duration: Duration, quantity: number) {
  const dur = DURATIONS.find((d) => d.value === duration)!;
  const qty = Math.max(1, Math.min(MAX_QUANTITY, quantity));
  const base = BASE_PRICES[duration] * qty;
  const fuel = FUEL_PER_HOUR_EUR * dur.hours * qty;
  const subtotal = base + fuel;
  const total = subtotal + DELIVERY_FEE;
  return {
    base,
    fuel,
    delivery: DELIVERY_FEE,
    subtotal,
    total,
    hours: dur.hours,
  };
}
