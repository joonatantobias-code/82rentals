import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  topic?: string;
};

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Virheellinen JSON" },
      { status: 400 }
    );
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { ok: false, error: "Pakollisia kenttiä puuttuu" },
      { status: 400 }
    );
  }

  // TODO: forward to email/CRM. Currently logs server-side.
  const ticketId = `MSG-${Date.now().toString(36).toUpperCase()}`;
  console.log("[82rentals] new message", { ticketId, ...payload });

  return NextResponse.json({ ok: true, ticketId }, { status: 200 });
}
