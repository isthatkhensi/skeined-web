import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The public anon key + URL are safe to expose in a frontend — that is exactly
// what anon keys are for. Provide them via a local .env file (see .env.example):
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
// TODO(founder): copy EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY
// from the app repo's .env.local into this project's .env as the VITE_* names above.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        // Recovery / confirmation links carry the token in the URL — let the
        // client pick it up and establish the session automatically.
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
