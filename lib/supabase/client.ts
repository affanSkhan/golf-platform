import {createBrowserClient} from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pgvopyvtumjzljqhsngl.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_f4vfwuaTMu0GKzYNu_cbUQ_BpdyS92a";

export function getSupabaseBrowser(){
  return createBrowserClient(SUPABASE_URL,SUPABASE_KEY);
}
