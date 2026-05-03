import { NextResponse } from "next/server";
import { listBookings } from "@/lib/crm";

export const dynamic = "force-dynamic";

/**
 * Admin bookings list. Add real auth (e.g. NextAuth, basic header check) before
 * exposing in production. For now this returns mock in-memory bookings.
 */
export async function GET(request: Request) {
  // Basic gate using a header — replace with proper auth.
  const adminKey = process.env.ADMIN_API_KEY;
  if (adminKey) {
    const got = request.headers.get("x-admin-key");
    if (got !== adminKey) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const bookings = await listBookings();
  return NextResponse.json({ ok: true, bookings });
}
