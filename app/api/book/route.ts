import { NextResponse } from "next/server";
import { createBooking, ALL_SLOTS, type Slot } from "@/lib/crm";
import { DURATIONS, MAX_QUANTITY, type Duration } from "@/lib/pricing";

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
