import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { parseAccessList } from "@/lib/excel/parse";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const fd = await req.formData();
  const file = fd.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "File mancante" }, { status: 400 });
  const rows = await parseAccessList(file);
  const batch = crypto.randomUUID();
  const payload = rows.map((r) => ({ ...r, active: true, source_batch_id: batch, updated_at: new Date().toISOString() }));
  const { error } = await supabaseAdmin.from("dealer_access_list").upsert(payload, { onConflict: "email,pdv_code" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, rows: rows.length, batch });
}