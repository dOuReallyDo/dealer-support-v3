import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isSupabaseAvailable, getDb } from "@/lib/supabase/admin";
import { getDealerDeviceToken, hashToken } from "@/lib/auth/cookies";

export async function GET() {
  /* 1. Check for static session cookie */
  const cookieStore = await cookies();
  const ds3Cookie = cookieStore.get("ds3_device");
  if (ds3Cookie?.value) {
    /* Static dealer session — decode from a second cookie */
    const dealerInfo = cookieStore.get("ds3_dealer");
    if (dealerInfo?.value) {
      try {
        const info = JSON.parse(decodeURIComponent(dealerInfo.value));
        return NextResponse.json({ dealer: info });
      } catch {
        /* Fall through to Supabase */
      }
    }
  }

  /* 2. Try Supabase session */
  if (isSupabaseAvailable) {
    const db = getDb();
    const token = await getDealerDeviceToken();
    if (!token) return NextResponse.json({ dealer: null });
    const { data } = await db
      .from("dealer_devices")
      .select("id,email,pdv_code,active")
      .eq("device_token_hash", hashToken(token))
      .eq("active", true)
      .maybeSingle();
    if (!data) return NextResponse.json({ dealer: null });
    const row = data as Record<string, string>;
    await db
      .from("dealer_devices")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("id", row.id);
    return NextResponse.json({ dealer: { email: row.email, pdv_code: row.pdv_code } });
  }

  return NextResponse.json({ dealer: null });
}