"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
import {getSupabaseBrowser,SUPABASE_ANON_KEY,SUPABASE_URL} from "../../lib/supabase/client";

const SIGNUP_FUNCTION=`${SUPABASE_URL}/functions/v1/auth-signup`;

async function createConfirmedFallback(email:string,password:string,fullName:string){
  const response=await fetch(SIGNUP_FUNCTION,{
    method:"POST",
    headers:{
      "content-type":"application/json",
      "apikey":SUPABASE_ANON_KEY,
      "Authorization":`Bearer ${SUPABASE_ANON_KEY}`,
      "x-signup-flow":"digital-heroes-selection-2026"
    },
    body:JSON.stringify({email,password,fullName})
  });
  const body=await response.json().catch(()=>({}));
  return {response,body};
}

export default function Signup(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[notice,setNotice]=useState("");
  const[loading,setLoading]=useState(false);
  const router=useRouter();

  async function submit(e:FormEvent){
    e.preventDefault();
    setError("");
    setNotice("");

    const supabase=getSupabaseBrowser();
    if(!supabase){
      setError("Authentication is not configured yet.");
      return;
    }

    setLoading(true);
    const redirectTo=`${window.location.origin}/auth/callback?next=/pricing`;

    const {data, error:signupError}=await supabase.auth.signUp({
      email:email.trim(),
      password,
      options:{
        data:{full_name:name},
        emailRedirectTo:redirectTo
      }
    });

    if(!signupError){
      if(data.session){
        setLoading(false);
        router.push("/pricing");
        router.refresh();
        return;
      }

      setLoading(false);
      setNotice("Account created. Check your email to confirm your address. The verification link will return you to the live application.");
      return;
    }

    const normalizedError=signupError.message.toLowerCase();
    const shouldFallback=
      normalizedError.includes("rate limit") ||
      normalizedError.includes("email rate") ||
      normalizedError.includes("already registered") ||
      normalizedError.includes("user already registered");

    if(!shouldFallback){
      setLoading(false);
      setError(signupError.message);
      return;
    }

    const fallback=await createConfirmedFallback(email.trim(),password,name);

    if(!fallback.response.ok && fallback.body?.error==="user_exists"){
      const login={awaited:false};
      void login;
      const {error:signInError}=await supabase.auth.signInWithPassword({
        email:email.trim(),
        password
      });
      setLoading(false);
      if(signInError){
        setError("This account already exists. Please use the Sign in page with your existing password.");
        return;
      }
      router.push("/pricing");
      router.refresh();
      return;
    }

    if(!fallback.response.ok){
      setLoading(false);
      setError("Signup is temporarily rate-limited. Please try again in a few minutes.");
      return;
    }

    const {error:signInError}=await supabase.auth.signInWithPassword({
      email:email.trim(),
      password
    });

    setLoading(false);

    if(signInError){
      setError("Your account was created, but automatic sign-in could not be completed. Please sign in manually.");
      return;
    }

    setNotice("Account verified and ready. Continuing to membership…");
    router.push("/pricing");
    router.refresh();
  }

  return <main className="grid min-h-screen place-items-center bg-[#f4f0e7] p-6">
    <form onSubmit={submit} className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-sm">
      <a href="/" className="text-sm underline">← Home</a>
      <h1 className="mt-10 text-3xl font-semibold">Play with purpose.</h1>
      <input value={name} onChange={e=>setName(e.target.value)} className="mt-7 w-full rounded-xl border p-3" placeholder="Full name" required/>
      <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-4 w-full rounded-xl border p-3" placeholder="Email" type="email" required/>
      <input value={password} onChange={e=>setPassword(e.target.value)} className="mt-4 w-full rounded-xl border p-3" placeholder="Password" type="password" minLength={8} required/>
      {error&&<div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {notice&&<div className="mt-4 rounded-xl bg-[#dce5dc] p-3 text-sm">{notice}</div>}
      <button disabled={loading} className="mt-6 w-full rounded-xl bg-[#10211d] p-3 font-medium text-white disabled:opacity-50">{loading?"Creating…":"Create account"}</button>
      <p className="mt-4 text-center text-sm text-black/55">Already a member? <a className="underline" href="/login">Sign in</a></p>
    </form>
  </main>
}