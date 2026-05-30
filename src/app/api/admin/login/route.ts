import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth/cookies";
import crypto from "crypto";

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 12)
    return NextResponse.json({ error: "ADMIN_PASSWORD mancante o troppo corta" }, { status: 500 });
  const provided = String(password || "");
  const ok = provided.length === expected.length && crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!ok) return NextResponse.json({ error: "Password non valida" }, { status: 401 });
  await setAdminSession();
  return NextResponse.json({ ok: true });
}