import { NextResponse } from "next/server";
import { getDealerDeviceToken, hashToken } from "@/lib/auth/cookies";
import { isSupabaseAvailable, getDb } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  if (!isSupabaseAvailable)
    return NextResponse.json(
      { error: "Supabase non configurato" },
      { status: 503 }
    );
  const db = getDb();

  const token = await getDealerDeviceToken();
  if (!token)
    return NextResponse.json(
      { error: "Browser non registrato" },
      { status: 401 }
    );

  const { data: device } = await db
    .from("dealer_devices")
    .select("*")
    .eq("device_token_hash", hashToken(token))
    .eq("active", true)
    .maybeSingle();

  if (!device)
    return NextResponse.json(
      { error: "Token non valido o revocato" },
      { status: 401 }
    );

  const deviceRow = device as Record<string, string>;
  const input = await req.json();

  /* Log the quote request */
  await db.from("dealer_quote_logs").insert({
    dealer_device_id: deviceRow.id,
    email: deviceRow.email,
    pdv_code: deviceRow.pdv_code,
    input,
    output: { items: input.items || [], total: input.total || 0 },
  });

  return NextResponse.json({ ok: true });
}