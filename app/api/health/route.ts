import {NextResponse} from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"digital-heroes-golf-platform",timestamp:new Date().toISOString(),databaseConfigured:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),paymentConfigured:Boolean(process.env.STRIPE_SECRET_KEY)});}
