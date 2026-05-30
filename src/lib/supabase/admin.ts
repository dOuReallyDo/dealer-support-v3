import { createClient } from "@supabase/supabase-js";

type GenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: [];
};
type Database = {
  public: {
    Tables: Record<string, GenericTable>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type AdminClient = ReturnType<typeof createClient<Database>>;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const HAS_REAL_CREDS =
  SUPABASE_URL.startsWith("https://") && SUPABASE_SERVICE_KEY.startsWith("eyJ");

/** Returns the Supabase admin client, or null if not configured */
export function getSupabaseAdmin(): AdminClient | null {
  if (!HAS_REAL_CREDS) return null;
  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

/** Convenience: non-null assertion. Use ONLY inside a check for `isSupabaseAvailable()` */
export function getDb(): AdminClient {
  const client = getSupabaseAdmin();
  if (!client) throw new Error("Supabase non configurato");
  return client;
}

export const isSupabaseAvailable = HAS_REAL_CREDS;