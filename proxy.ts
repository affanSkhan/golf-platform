import {createServerClient} from "@supabase/ssr";import {NextResponse,type NextRequest} from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pgvopyvtumjzljqhsngl.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_f4vfwuaTMu0GKzYNu_cbUQ_BpdyS92a";

export async function proxy(request:NextRequest){
  let response=NextResponse.next({request});
  const supabase=createServerClient(SUPABASE_URL,SUPABASE_KEY,{
    cookies:{
      getAll(){return request.cookies.getAll()},
      setAll(cookiesToSet){
        cookiesToSet.forEach(({name,value,options})=>request.cookies.set(name,value));
        response=NextResponse.next({request});
        cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options))
      }
    }
  });
  await supabase.auth.getUser();
  return response
}
export const config={matcher:["/dashboard/:path*","/admin/:path*","/winner/:path*"]};
