import { NextResponse } from "next/server";
import { isAdmin } from "./cookies";

export async function requireAdmin() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Accesso admin richiesto" }, { status: 401 });
  }
  return null;
}