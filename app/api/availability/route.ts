import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/crm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.max(
    1,
    Math.min(60, parseInt(searchParams.get("days") || "14", 10))
  );

  const availability = await getAvailability(days);
  return NextResponse.json({ ok: true, days: availability });
}
