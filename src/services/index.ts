import { createClient } from "@supabase/supabase-js";
export type {
  Session as ISupabaseSession,
  User as ISupabaseUser,
  PostgrestResponse as ISupabasePostgrestResponse,
} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Most provide VITE_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error("Most provide VITE_SUPABASE_ANON_KEY");
}

export default createClient(supabaseUrl, supabaseAnonKey);
