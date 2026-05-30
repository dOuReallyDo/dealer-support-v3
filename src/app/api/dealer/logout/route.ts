import { NextResponse } from "next/server";
import { clearDealerDeviceToken } from "@/lib/auth/cookies";

export async function POST() {
  await clearDealerDeviceToken();
  return NextResponse.json({ ok: true });
}