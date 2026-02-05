"use client";
import { useState } from "react";
export default function SettingsForm({ settings }: { settings:any }){
  const [s,setS]=useState({
    siteName: settings?.siteName||"SoccerMidable",
    domain: settings?.domain||"soccermidable.ca",
    heroVideoUrl: settings?.heroVideoUrl||"/video/hero.mp4",
    heroPosterUrl: settings?.heroPosterUrl||"/images/hero-poster.jpg",
    contactEmail: settings?.contactEmail||"",
    contactPhone: settings?.contactPhone||"",
    whatsapp: settings?.whatsapp||"",
    facebook: settings?.facebook||"",
    instagram: settings?.instagram||"",
    youtube: settings?.youtube||"",
    linkedin: settings?.linkedin||""
  });
  const [msg,setMsg]=useState<string|null>(null);

  async function upload(kind:"heroPosterUrl"|"heroVideoUrl", file:File){
    const fd=new FormData(); fd.append("file", file);
    const res=await fetch("/api/upload",{method:"POST", body:fd});
    const j=await res.json();
    if(j?.url) setS(prev=>({...prev, [kind]: j.url}));
  }

  async function save(e:React.FormEvent){
    e.preventDefault(); setMsg(null);
    const res=await fetch("/admin/settings/save",{method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify(s)});
    if(res.ok) setMsg("Saved.");
  }

  return (
    <form onSubmit={save} style={{display:"grid",gap:12}}>
      <div className="row">
        <div><label>Site name</label><input className="input" value={s.siteName} onChange={e=>setS({...s,siteName:e.target.value})} /></div>
        <div><label>Domain</label><input className="input" value={s.domain} onChange={e=>setS({...s,domain:e.target.value})} /></div>
      </div>

      <div className="row">
        <div>
          <label>Hero video URL</label>
          <input className="input" value={s.heroVideoUrl} onChange={e=>setS({...s,heroVideoUrl:e.target.value})} />
          <div className="small" style={{marginTop:6}}>Upload MP4:</div>
          <input type="file" accept="video/mp4" onChange={e=>{const f=e.target.files?.[0]; if(f) upload("heroVideoUrl", f);}} />
        </div>
        <div>
          <label>Hero poster URL</label>
          <input className="input" value={s.heroPosterUrl} onChange={e=>setS({...s,heroPosterUrl:e.target.value})} />
          <div className="small" style={{marginTop:6}}>Upload image:</div>
          <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f) upload("heroPosterUrl", f);}} />
        </div>
      </div>

      <div className="row">
        <div><label>Contact email</label><input className="input" value={s.contactEmail} onChange={e=>setS({...s,contactEmail:e.target.value})} /></div>
        <div><label>Contact phone</label><input className="input" value={s.contactPhone} onChange={e=>setS({...s,contactPhone:e.target.value})} /></div>
      </div>

      <div className="row">
        <div><label>WhatsApp</label><input className="input" value={s.whatsapp} onChange={e=>setS({...s,whatsapp:e.target.value})} /></div>
        <div><label>Instagram</label><input className="input" value={s.instagram} onChange={e=>setS({...s,instagram:e.target.value})} /></div>
      </div>

      <div className="row">
        <div><label>Facebook</label><input className="input" value={s.facebook} onChange={e=>setS({...s,facebook:e.target.value})} /></div>
        <div><label>YouTube</label><input className="input" value={s.youtube} onChange={e=>setS({...s,youtube:e.target.value})} /></div>
      </div>

      <div><label>LinkedIn</label><input className="input" value={s.linkedin} onChange={e=>setS({...s,linkedin:e.target.value})} /></div>

      {msg && <div className="toast">{msg}</div>}
      <button className="btn btnPrimary" type="submit">Save</button>
    </form>
  );
}
