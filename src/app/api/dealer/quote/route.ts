import { NextResponse } from "next/server";
import { getDealerDeviceToken, hashToken } from "@/lib/auth/cookies";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const token = await getDealerDeviceToken();
  if (!token) return NextResponse.json({ error: "Browser non registrato" }, { status: 401 });
  const { data: device } = await supabaseAdmin
    .from("dealer_devices")
    .select("*")
    .eq("device_token_hash", hashToken(token))
    .eq("active", true)
    .maybeSingle();
  if (!device) return NextResponse.json({ error: "Token non valido o revocato" }, { status: 401 });
  const deviceRow = device as Record<string, string>;
  const input = await req.json();

  /* Log the quote request */
  await supabaseAdmin.from("dealer_quote_logs").insert({
    dealer_device_id: deviceRow.id,
    email: deviceRow.email,
    pdv_code: deviceRow.pdv_code,
    input,
    output: { items: input.items || [], total: input.total || 0 },
  });

  return NextResponse.json({ ok: true });
}