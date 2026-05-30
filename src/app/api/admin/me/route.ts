import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/cookies";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  return NextResponse.json({ ok: true, admin: true });
}