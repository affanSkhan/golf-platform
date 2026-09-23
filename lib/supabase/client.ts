import {createBrowserClient} from "@supabase/ssr";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pgvopyvtumjzljqhsngl.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_f4vfwuaTMu0GKzYNu_cbUQ_BpdyS92a";

// Legacy anon JWT is safe for browser use and is used only to pass Supabase's
// built-in Edge Function JWT check for the public signup fallback.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndm9weXZ0dW1qemxqcWhzbmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzUzMTMsImV4cCI6MjEwNTY1MTMxM30.J50GlNEcCrBnCqKhM-T5-Yed4EdGbVOjxYzQ7Ar7yTg";

export function getSupabaseBrowser(){
  return createBrowserClient(SUPABASE_URL,SUPABASE_KEY);
}
