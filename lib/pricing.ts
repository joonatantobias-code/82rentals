export type Duration = "1h" | "2h" | "halfday";

export const DURATIONS: {
  value: Duration;
  label: string;
  hours: number;
}[] = [
  { value: "1h", label: "1 tunti", hours: 1 },
  { value: "2h", label: "2 tuntia", hours: 2 },
  { value: "halfday", label: "Puoli päivää (4h)", hours: 4 },
];

/** All-inclusive price per jet ski. Fuel, life jackets and insurance included.
 * Pickup is at Herttoniemen satama; delivery elsewhere is by separate agreement. */
export const BASE_PRICES: Record<Duration, number> = {
  "1h": 179,
  "2h": 279,
  halfday: 479,
};

/** Delivery is always free inside Helsinki. */
export const DELIVERY_FEE = 0;

/** Maximum jet skis per booking. We currently have 2. */
export const MAX_QUANTITY = 2;

export type TierTag = "fast" | "popular" | "best-value";

export const TIER_TAG: Record<Duration, TierTag> = {
  "1h": "fast",
  "2h": "popular",
  halfday: "best-value",
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
