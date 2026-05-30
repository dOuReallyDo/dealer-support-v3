import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { data, error } = await supabaseAdmin
    .from("dealer_access_list")
    .select("id,pdv_code,email,active,updated_at")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entries: data });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const pdv_code = String(body.pdv_code || "").trim();
  if (!email || !pdv_code) return NextResponse.json({ error: "PDV/email obbligatori" }, { status: 400 });
  const { error } = await supabaseAdmin
    .from("dealer_access_list")
    .upsert({ email, pdv_code, active: body.active ?? true, updated_at: new Date().toISOString() }, { onConflict: "email,pdv_code" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obbligatorio" }, { status: 400 });
  const { error } = await supabaseAdmin.from("dealer_access_list").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}