import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error("[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check env.local.");
  console.error("[supabase] Values present:", {
    supabaseUrlPresent: !!supabaseUrl,
    supabaseAnonKeyPresent: !!supabaseAnonKey,
  });
}

export const supabase = supabaseClient;
export default supabaseClient;

