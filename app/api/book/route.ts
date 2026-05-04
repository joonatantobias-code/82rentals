import { NextResponse } from "next/server";
import { createBooking, ALL_SLOTS, type Slot } from "@/lib/crm";
import { DURATIONS, MAX_QUANTITY, type Duration } from "@/lib/pricing";

const CRM_URL = process.env.CRM_API_URL;

type Payload = Partial<{
  date: string;
  slot: Slot;
  duration: Duration;
  quantity: number;
  name: string;
  phone: string;
  email: string;
  pickup: string;
  notes: string;
}>;

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Virheellinen JSON" },
      { status: 400 }
    );
  }

  // Required fields
  for (const key of [
    "date",
    "slot",
    "duration",
    "quantity",
    "name",
    "phone",
    "email",
    "pickup",
  ] as const) {
    if (!payload[key]) {
      return NextResponse.json(
        { ok: false, error: `Pakollinen kenttä puuttuu: ${key}` },
        { status: 400 }
      );
    }
  }
  if (!ALL_SLOTS.includes(payload.slot as Slot)) {
    return NextResponse.json(
      { ok: false, error: "Tuntematon kellonaika" },
      { status: 400 }
    );
  }
  if (!DURATIONS.find((d) => d.value === payload.duration)) {
    return NextResponse.json(
      { ok: false, error: "Tuntematon kesto" },
      { status: 400 }
    );
  }
  const qty = Number(payload.quantity);
  if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QUANTITY) {
    return NextResponse.json(
      { ok: false, error: `Vesijettien määrä 1–${MAX_QUANTITY}` },
      { status: 400 }
    );
  }

  // If a CRM is configured, forward the booking there so it lands in the
  // shared bookings table (single source of truth). Otherwise use the mock.
  if (CRM_URL) {
    try {
      const res = await fetch(`${CRM_URL}/api/public/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: payload.date,
          slot: payload.slot,
          duration: payload.duration,
          quantity: qty,
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          pickup: payload.pickup,
          notes: payload.notes,
        }),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        return NextResponse.json(
          { ok: false, error: data.error || "Varauksen tallennus epäonnistui" },
          { status: res.status || 500 }
        );
      }
      return NextResponse.json({ ok: true, bookingId: data.booking?.id });
    } catch (err) {
      return NextResponse.json(
        { ok: false, error: "Varauspalvelu ei vastaa, kokeile hetken päästä" },
        { status: 502 }
      );
    }
  }

  const booking = await createBooking({
    date: payload.date!,
    slot: payload.slot as Slot,
    duration: payload.duration as Duration,
    quantity: qty,
    name: payload.name!,
    phone: payload.phone!,
    email: payload.email!,
    pickup: payload.pickup!,
    notes: payload.notes,
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: "82rentals booking endpoint" },
    { status: 200 }
  );
}
