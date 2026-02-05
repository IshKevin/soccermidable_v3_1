"use client";
import { useState } from "react";
export default function LoginForm(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState<string|null>(null);
  async function submit(e:React.FormEvent){
    e.preventDefault(); setErr(null);
    const res = await fetch("/admin/login/action", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ email, password }) });
    if(!res.ok){ const j=await res.json().catch(()=>({})); setErr(j?.error||"Login failed"); return; }
    window.location.href="/admin";
  }
  return (
    <form onSubmit={submit} style={{display:"grid",gap:10}}>
      <div><label>Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><label>Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      {err && <div className="toast">{err}</div>}
      <button className="btn btnPrimary" type="submit">Login</button>
    </form>
  );
}
