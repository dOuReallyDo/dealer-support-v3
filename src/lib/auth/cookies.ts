import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_COOKIE = "dss_admin";
const DEALER_COOKIE = "dss_device";
const MAX_AGE = 60 * 60 * 24 * 180;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 24) throw new Error("AUTH_SECRET missing or too short");
  return s;
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function sign(value: string) {
  const sig = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  return `${value}.${sig}`;
}

export function verify(signed?: string) {
  if (!signed) return null;
  const idx = signed.lastIndexOf(".");
  if (idx < 1) return null;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) ? value : null;
}

export function newToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export async function setAdminSession() {
  const token = newToken();
  (await cookies()).set(ADMIN_COOKIE, sign(token), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: MAX_AGE });
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin() {
  return Boolean(verify((await cookies()).get(ADMIN_COOKIE)?.value));
}

export async function setDealerDeviceToken(token: string) {
  (await cookies()).set(DEALER_COOKIE, sign(token), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: MAX_AGE });
}

export async function getDealerDeviceToken() {
  return verify((await cookies()).get(DEALER_COOKIE)?.value);
}

export async function clearDealerDeviceToken() {
  (await cookies()).delete(DEALER_COOKIE);
}