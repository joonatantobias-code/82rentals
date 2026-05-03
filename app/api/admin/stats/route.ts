import { NextResponse } from "next/server";
import { getStats } from "@/lib/crm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (adminKey) {
    const got = request.headers.get("x-admin-key");
    if (got !== adminKey) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const stats = await getStats();
  return NextResponse.json({ ok: true, stats });
}
