import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDealerDeviceToken, hashToken, newToken, setDealerDeviceToken } from "@/lib/auth/cookies";

export async function POST(req: Request) {
  try {
    const { email: rawEmail, pdv_code: rawPdv } = await req.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    const pdv_code = String(rawPdv || "").trim();
    if (!email || !pdv_code) return NextResponse.json({ error: "Email e PDV obbligatori" }, { status: 400 });

    const { data: access } = await supabaseAdmin
      .from("dealer_access_list")
      .select("*")
      .eq("email", email)
      .eq("pdv_code", pdv_code)
      .eq("active", true)
      .maybeSingle();
    if (!access) return NextResponse.json({ error: "Email/PDV non presenti nella lista autorizzata" }, { status: 403 });

    const accessRow = access as Record<string, string>;
    let token = await getDealerDeviceToken();
    if (!token) {
      token = newToken();
      await setDealerDeviceToken(token);
    }
    const token_hash = hashToken(token);
    const { error } = await supabaseAdmin
      .from("dealer_devices")
      .upsert(
        { access_entry_id: accessRow.id, pdv_code, email, device_token_hash: token_hash, active: true, last_seen_at: new Date().toISOString() },
        { onConflict: "device_token_hash" }
      );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ dealer: { email, pdv_code } });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Errore interno" }, { status: 500 });
  }
}