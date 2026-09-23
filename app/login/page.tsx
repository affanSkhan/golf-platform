"use client";
import {FormEvent,useState} from "react";import {useRouter} from "next/navigation";import {getSupabaseBrowser} from "../../lib/supabase/client";

export default function Login(){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const router=useRouter();

  async function submit(e:FormEvent){
    e.preventDefault();
    setError("");
    const supabase=getSupabaseBrowser();
    if(!supabase){
      setError("Authentication is not configured yet.");
      return;
    }

    setLoading(true);
    const{error:signInError}=await supabase.auth.signInWithPassword({email,password});

    if(signInError){
      setLoading(false);
      setError(signInError.message);
      return;
    }

    const{data:authData}=await supabase.auth.getUser();
    const user=authData.user;

    if(!user){
      setLoading(false);
      setError("Sign in completed, but your account session could not be loaded.");
      return;
    }

    const{data:profile,error:profileError}=await supabase
      .from("profiles")
      .select("role")
      .eq("id",user.id)
      .maybeSingle();

    if(profileError){
      setLoading(false);
      setError("Signed in, but your account role could not be loaded. Please try again.");
      return;
    }

    setLoading(false);

    // Keep the two PRD roles on their own primary surfaces:
    // administrators -> admin control panel, subscribers -> member dashboard.
    router.replace(profile?.role==="admin"?"/admin":"/dashboard");
    router.refresh();
  }

  return <main className="grid min-h-screen place-items-center bg-[#f4f0e7] p-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm"><a href="/" className="text-sm underline">← Home</a><h1 className="mt-10 text-3xl font-semibold">Welcome back.</h1><label className="mt-7 block text-sm">Email<input value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border p-3" type="email" required/></label><label className="mt-4 block text-sm">Password<input value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border p-3" type="password" required/></label>{error&&<div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-[#10211d] p-3 font-medium text-white disabled:opacity-50">{loading?"Signing in…":"Continue"}</button><p className="mt-4 text-center text-sm text-black/55">New here? <a className="underline" href="/signup">Create an account</a></p></form></main>
}
