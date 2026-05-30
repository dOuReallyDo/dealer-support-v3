import * as XLSX from "xlsx";

export type AccessRow = { pdv_code: string; email: string };
export type MatrixRow = Record<string, string | number | boolean | null>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function parseWorkbook(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  if (!sheet) throw new Error("Workbook senza fogli");
  return sheet;
}

export async function parseAccessList(file: File): Promise<AccessRow[]> {
  const sheet = await parseWorkbook(file);
  const rows = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, defval: "" });
  const parsed: AccessRow[] = [];
  for (const [i, row] of rows.entries()) {
    const pdv = String(row[0] ?? "").trim();
    const email = String(row[1] ?? "").trim().toLowerCase();
    if (!pdv && !email) continue;
    if (!pdv || !emailRe.test(email)) throw new Error(`Riga ${i + 1}: PDV/email non validi`);
    parsed.push({ pdv_code: pdv, email });
  }
  return parsed;
}

export async function parseOfferMatrix(file: File): Promise<MatrixRow[]> {
  const sheet = await parseWorkbook(file);
  const rows = XLSX.utils.sheet_to_json<MatrixRow>(sheet, { defval: null, raw: false });
  return rows.map((r) => {
    const cleaned: MatrixRow = {};
    for (const [k, v] of Object.entries(r)) cleaned[String(k).trim()] = typeof v === "string" ? v.trim() : v;
    return cleaned;
  }).filter((r) => Object.values(r).some((v) => v !== null && v !== ""));
}