import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/crm";

export const dynamic = "force-dynamic";

const CRM_URL = process.env.CRM_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.max(
    1,
    Math.min(60, parseInt(searchParams.get("days") || "14", 10))
  );

  // Prefer real availability from the CRM if it's configured. Fall back to the
  // mock so local previews keep working when CRM_API_URL is missing.
  if (CRM_URL) {
    try {
      const res = await fetch(`${CRM_URL}/api/public/availability?days=${days}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ ok: true, days: data.days });
      }
    } catch {
      // fall through to mock
    }
  }

  const availability = await getAvailability(days);
  return NextResponse.json({ ok: true, days: availability });
}
