import { NextResponse } from "next/server";
import { getDealerDeviceToken, hashToken } from "@/lib/auth/cookies";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const token = await getDealerDeviceToken();
  if (!token) return NextResponse.json({ dealer: null });
  const { data } = await supabaseAdmin
    .from("dealer_devices")
    .select("id,email,pdv_code,active")
    .eq("device_token_hash", hashToken(token))
    .eq("active", true)
    .maybeSingle();
  if (!data) return NextResponse.json({ dealer: null });
  const row = data as Record<string, string>;
  await supabaseAdmin.from("dealer_devices").update({ last_seen_at: new Date().toISOString() }).eq("id", row.id);
  return NextResponse.json({ dealer: { email: row.email, pdv_code: row.pdv_code } });
}