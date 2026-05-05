// CRM swap layer. Today every function returns mock data so the site can
// run end-to-end without any external system. When the real CRM is ready,
// implement each function as a network call (typically a fetch to your CRM
// API) and the rest of the codebase stays untouched.
//
// To wire a real backend, set these env vars in `.env.local`:
//   CRM_BASE_URL=https://crm.example.com
//   CRM_API_KEY=...
// and replace the mock bodies below with `fetch(...)` calls.

import { calculatePrice, MAX_QUANTITY, type Duration } from "./pricing";

/**
 * Vuokraamo on auki klo 09–22. Asiakas voi aloittaa vuokrauksen tasatunnein
 * niin että ajo päättyy viimeistään 22:00. Esim. 8 h ajon viimeinen alku on
 * 14:00. Kaikki mahdolliset aloitustunnit ovat tässä; UI suodattaa keston
 * mukaan.
 */
export type Slot =
  | "09:00"
  | "10:00"
  | "11:00"
  | "12:00"
  | "13:00"
  | "14:00"
  | "15:00"
  | "16:00"
  | "17:00"
  | "18:00"
  | "19:00"
  | "20:00"
  | "21:00";

export const ALL_SLOTS: Slot[] = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
];

export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 22;

export type DayAvailability = {
  /** ISO yyyy-mm-dd */
  date: string;
  /** Number of vesijetti available for this whole day */
  fleetSize: number;
  /** For each slot, how many vesijetti are still bookable */
  slots: Record<Slot, number>;
};

export type Booking = {
  id: string;
  date: string;
  slot: Slot;
  duration: Duration;
  quantity: number;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  notes?: string;
  totalEUR: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

// In-memory mock store. Resets when the dev server restarts. Replace with a
// real DB / CRM in production.
const MOCK_BOOKINGS: Booking[] = [];

/** Stable RNG so the calendar shows the same demo data on each render. */
function pseudoRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/**
 * Returns availability for the next `days` days. Currently mocks the data;
 * swap to a real CRM call when ready.
 */
export async function getAvailability(days = 14): Promise<DayAvailability[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const out: DayAvailability[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);

    const slots = {} as Record<Slot, number>;
    for (const s of ALL_SLOTS) {
      // Pseudo-random bookings — most slots open, some half-booked, a few full.
      const r = pseudoRandom(`${iso}-${s}`);
      let available = MAX_QUANTITY;
      if (r > 0.85) available = 0; // fully booked
      else if (r > 0.6) available = 1; // one taken
      // Apply real bookings on top
      const taken = MOCK_BOOKINGS.filter(
        (b) => b.date === iso && b.slot === s && b.status !== "cancelled"
      ).reduce((sum, b) => sum + b.quantity, 0);
      slots[s] = Math.max(0, available - taken);
    }

    out.push({ date: iso, fleetSize: MAX_QUANTITY, slots });
  }

  return out;
}

/** Validate + persist a new booking, return the saved record. */
export async function createBooking(input: {
  date: string;
  slot: Slot;
  duration: Duration;
  quantity: number;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  notes?: string;
}): Promise<Booking> {
  const price = calculatePrice(input.duration, input.quantity);
  const id = `BK-${Date.now().toString(36).toUpperCase()}`;
  const booking: Booking = {
    id,
    ...input,
    totalEUR: price.total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  MOCK_BOOKINGS.push(booking);

  // TODO: forward to real CRM:
  // await fetch(`${process.env.CRM_BASE_URL}/bookings`, { ... })

  return booking;
}

/** Returns all bookings for the staff dashboard. */
export async function listBookings(): Promise<Booking[]> {
  return [...MOCK_BOOKINGS].sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt)
  );
}

/** Aggregate stats for the staff dashboard. */
export async function getStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  revenueEUR: number;
}> {
  const bookings = await listBookings();
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenueEUR: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.totalEUR, 0),
  };
}
