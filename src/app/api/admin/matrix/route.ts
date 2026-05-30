import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { parseOfferMatrix } from "@/lib/excel/parse";
import { supabaseAdmin } from "@/lib/supabase/admin";

function pick(row: Record<string, unknown>, names: string[]) {
  for (const n of names) if (row[n] !== undefined) return row[n];
  return null;
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const fd = await req.formData();
  const file = fd.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "File mancante" }, { status: 400 });
  const rows = await parseOfferMatrix(file);
  if (!rows.length) return NextResponse.json({ error: "Matrice vuota" }, { status: 400 });
  const { data: version, error: vErr } = await supabaseAdmin
    .from("offer_matrix_versions")
    .insert({ filename: file.name, row_count: rows.length, active: true })
    .select()
    .single();
  if (vErr) return NextResponse.json({ error: vErr.message }, { status: 500 });
  const versionRow = version as Record<string, string>;
  await supabaseAdmin.from("offer_matrix_versions").update({ active: false }).neq("id", versionRow.id);
  const payload = rows.map((row, idx) => ({
    version_id: versionRow.id,
    row_number: idx + 1,
    offer_code: String(pick(row, ["offer_code", "codice_offerta", "codice"]) ?? "") || null,
    offer_name: String(pick(row, ["offer_name", "nome_offerta", "offerta", "name"]) ?? "") || null,
    priority: Number(pick(row, ["priority", "priorita", "priorità"]) ?? 999),
    rules: row,
  }));
  const { error } = await supabaseAdmin.from("offer_matrix_rows").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, rowCount: rows.length });
}