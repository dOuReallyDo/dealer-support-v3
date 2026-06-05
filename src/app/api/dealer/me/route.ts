import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ dealer: { email: "open-access@dealer-support.local", pdv_code: "OPEN" } });
}
