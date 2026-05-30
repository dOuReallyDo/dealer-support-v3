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

export function getSupabaseAdmin(): AdminClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Missing Supabase env vars");
  return createClient<Database>(url, serviceKey, { auth: { persistSession: false } });
}

export const supabaseAdmin = new Proxy({} as AdminClient, {
  get(_target, prop) {
    return getSupabaseAdmin()[prop as keyof AdminClient];
  }
});