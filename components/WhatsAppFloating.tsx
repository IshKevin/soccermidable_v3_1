"use client";
import { useEffect, useState } from "react";
export default function WhatsAppFloating({ locale, number }: { locale:"fr"|"en", number?:string|null }) {
  const [show,setShow]=useState(false);
  const [collapsed,setCollapsed]=useState(true);
  useEffect(()=>{ const on=()=>{ const y=window.scrollY||0; const h=document.documentElement.scrollHeight-window.innerHeight; const p=h>0?y/h:0; setShow(p>0.12); }; on(); window.addEventListener("scroll",on,{passive:true}); return ()=>window.removeEventListener("scroll",on); },[]);
  useEffect(()=>{ if(!show) return; const t=setTimeout(()=>setCollapsed(false),400); const t2=setTimeout(()=>setCollapsed(true),5500); return ()=>{clearTimeout(t);clearTimeout(t2)}; },[show]);
  const n=number || (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"+12025550123");
  const msg = locale==="fr" ? "Bonjour, je visite soccermidable.ca et je voudrais des infos sur les programmes." : "Hello, I'm visiting soccermidable.ca and I'd like info about the programs.";
  const href=`https://wa.me/${n.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
  if(!show) return null;
  return (
    <a href={href} target="_blank" aria-label="WhatsApp"
      style={{position:"fixed",right:16,bottom:16,zIndex:90,display:"flex",alignItems:"center",gap:10,padding:collapsed?"12px 12px":"12px 16px",borderRadius:999,border:"1px solid var(--line)",background:"rgba(0,0,0,.35)",backdropFilter:"blur(10px)"}}>
      <span style={{width:12,height:12,borderRadius:999,background:"#22c55e",boxShadow:"0 0 0 4px rgba(34,197,94,.2)"}} />
      {!collapsed && <span style={{fontWeight:800}}>WhatsApp</span>}
    </a>
  );
}
