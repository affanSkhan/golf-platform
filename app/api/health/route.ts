import {NextResponse} from "next/server";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pgvopyvtumjzljqhsngl.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_f4vfwuaTMu0GKzYNu_cbUQ_BpdyS92a";
export async function GET(){
  return NextResponse.json({
    ok:true,
    service:"digital-heroes-golf-platform",
    timestamp:new Date().toISOString(),
    databaseConfigured:Boolean(SUPABASE_URL&&SUPABASE_KEY),
    paymentConfigured:Boolean(process.env.STRIPE_SECRET_KEY)
  });
}
