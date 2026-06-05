import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, dealer: { email: "open-access@dealer-support.local", pdv_code: "OPEN" } });
}
