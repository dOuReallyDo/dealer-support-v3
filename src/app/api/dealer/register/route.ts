import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isSupabaseAvailable, getDb } from "@/lib/supabase/admin";
import { getDealerDeviceToken, hashToken, newToken, setDealerDeviceToken } from "@/lib/auth/cookies";

/* ── Static fallback: demo dealers work without Supabase ── */
const STATIC_DEALERS: { email: string; pdv_code: string; name: string }[] = [
  { email: "demo@windtre.it", pdv_code: "001234", name: "PDV Demo WindTre" },
  { email: "demo@tim.it", pdv_code: "002345", name: "PDV Demo TIM" },
  { email: "demo@vodafone.it", pdv_code: "003456", name: "PDV Demo Vodafone" },
  { email: "demo@fastweb.it", pdv_code: "004567", name: "PDV Demo Fastweb" },
  { email: "demo@iliad.it", pdv_code: "005678", name: "PDV Demo iliad" },
  { email: "test@test.it", pdv_code: "999999", name: "Test PDV" },
];

function staticMatch(email: string, pdv_code: string) {
  return STATIC_DEALERS.find(
    (d) => d.email === email && d.pdv_code === pdv_code
  );
}

export async function POST(req: Request) {
  try {
    const { email: rawEmail, pdv_code: rawPdv } = await req.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    const pdv_code = String(rawPdv || "").trim();
    if (!email || !pdv_code)
      return NextResponse.json({ error: "Email e PDV obbligatori" }, { status: 400 });

    /* 1. Try static fallback first */
    const staticDealer = staticMatch(email, pdv_code);
    if (staticDealer) {
      /* Static dealers get simple session cookies */
      const cookieStore = await cookies();
      const dealerInfo = JSON.stringify({ email, pdv_code, name: staticDealer.name });
      cookieStore.set("ds3_device", "static_session", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
      });
      cookieStore.set("ds3_dealer", encodeURIComponent(dealerInfo), {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
      });
      return NextResponse.json({
        dealer: { email, pdv_code, name: staticDealer.name },
        static: true,
      });
    }

    /* 2. Try Supabase if available */
    if (isSupabaseAvailable) {
      const db = getDb();
      const { data: access } = await db
        .from("dealer_access_list")
        .select("*")
        .eq("email", email)
        .eq("pdv_code", pdv_code)
        .eq("active", true)
        .maybeSingle();

      if (!access)
        return NextResponse.json(
          { error: "Email/PDV non presenti nella lista autorizzata" },
          { status: 403 }
        );

      const accessRow = access as Record<string, string>;
      let token = await getDealerDeviceToken();
      if (!token) {
        token = newToken();
        await setDealerDeviceToken(token);
      }
      const token_hash = hashToken(token);
      const { error } = await db
        .from("dealer_devices")
        .upsert(
          {
            access_entry_id: accessRow.id,
            pdv_code,
            email,
            device_token_hash: token_hash,
            active: true,
            last_seen_at: new Date().toISOString(),
          },
          { onConflict: "device_token_hash" }
        );
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ dealer: { email, pdv_code } });
    }

    /* 3. No static match, no Supabase */
    return NextResponse.json(
      { error: "Email/PDV non presenti nella lista autorizzata" },
      { status: 403 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore interno" },
      { status: 500 }
    );
  }
}