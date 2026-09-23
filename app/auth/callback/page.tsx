"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {getSupabaseBrowser} from "../../../lib/supabase/client";

function safeNext(value:string|null){
  if(!value || !value.startsWith("/") || value.startsWith("//")) return "/pricing";
  return value;
}

export default function AuthCallback(){
  const router=useRouter();
  const[error,setError]=useState("");

  useEffect(()=>{
    let cancelled=false;

    async function completeVerification(){
      const supabase=getSupabaseBrowser();
      if(!supabase){
        setError("Authentication is not configured yet.");
        return;
      }

      const params=new URLSearchParams(window.location.search);
      const code=params.get("code");
      const tokenHash=params.get("token_hash");
      const type=params.get("type");
      const next=safeNext(params.get("next"));

      let authError:Error|null=null;

      if(code){
        const result=await supabase.auth.exchangeCodeForSession(code);
        authError=result.error;
      }else if(tokenHash && type){
        const result=await supabase.auth.verifyOtp({
          token_hash:tokenHash,
          type:type as "signup"|"invite"|"magiclink"|"recovery"|"email_change"
        });
        authError=result.error;
      }else{
        authError=new Error("The verification link is missing a valid authentication code.");
      }

      if(cancelled) return;

      if(authError){
        setError(authError.message);
        return;
      }

      router.replace(next);
      router.refresh();
    }

    completeVerification();

    return()=>{cancelled=true};
  },[router]);

  return <main className="grid min-h-screen place-items-center bg-[#f6f3ea] px-5 text-[#12201d]">
    <section className="w-full max-w-md rounded-[2rem] border border-black/8 bg-white/75 p-8 text-center shadow-xl shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#d9e5dc] text-xl font-semibold text-[#40584b]">
        ✓
      </div>
      <div className="mt-6 text-[10px] font-semibold uppercase tracking-[.22em] text-[#d58f58]">Account verification</div>
      {error ? (
        <>
          <h1 className="mt-3 text-2xl font-semibold">Verification could not be completed</h1>
          <p className="mt-3 text-sm leading-6 text-black/55">{error}</p>
          <a href="/login" className="mt-6 inline-flex rounded-full bg-[#12201d] px-5 py-3 text-sm font-medium text-white">Back to sign in</a>
        </>
      ) : (
        <>
          <h1 className="mt-3 text-2xl font-semibold">Verifying your account…</h1>
          <p className="mt-3 text-sm leading-6 text-black/50">Your email confirmation is being completed securely. You will be returned to the live application shortly.</p>
          <div className="mx-auto mt-7 h-1.5 w-40 overflow-hidden rounded-full bg-black/5">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#567261]" />
          </div>
        </>
      )}
    </section>
  </main>;
}
