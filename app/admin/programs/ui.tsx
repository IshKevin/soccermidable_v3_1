"use client";
import { useState } from "react";
export default function ProgramForm({ program }: { program?: any }) {
  const [s,setS]=useState({
    id: program?.id||"",
    slug: program?.slug||"",
    title_en: program?.title_en||"",
    title_fr: program?.title_fr||"",
    summary_en: program?.summary_en||"",
    summary_fr: program?.summary_fr||"",
    body_en: program?.body_en||"",
    body_fr: program?.body_fr||"",
    imageUrl: program?.imageUrl||"",
    isFeatured: !!program?.isFeatured
  });
  const [msg,setMsg]=useState<string|null>(null);
  const [err,setErr]=useState<string|null>(null);

  async function save(e:React.FormEvent){
    e.preventDefault(); setMsg(null); setErr(null);
    const res = await fetch("/admin/programs/save", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(s) });
    const j = await res.json().catch(()=>({}));
    if(!res.ok){ setErr(j?.error||"Failed"); return; }
    setMsg("Saved"); window.location.href="/admin/programs";
  }
  async function del(){
    if(!s.id) return;
    if(!confirm("Delete?")) return;
    const res = await fetch("/admin/programs/delete", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ id: s.id }) });
    if(res.ok) window.location.href="/admin/programs";
  }

  return (
    <form onSubmit={save} style={{display:"grid",gap:12}}>
      <div className="row">
        <div><label>Slug</label><input className="input" value={s.slug} onChange={e=>setS({...s,slug:e.target.value})} required /></div>
        <div className="toast"><label style={{display:"flex",gap:8,alignItems:"center",margin:0}}><input type="checkbox" checked={s.isFeatured} onChange={e=>setS({...s,isFeatured:e.target.checked})}/> Featured on Home</label></div>
      </div>
      <div className="row">
        <div><label>Title EN</label><input className="input" value={s.title_en} onChange={e=>setS({...s,title_en:e.target.value})} required /></div>
        <div><label>Title FR</label><input className="input" value={s.title_fr} onChange={e=>setS({...s,title_fr:e.target.value})} required /></div>
      </div>
      <div className="row">
        <div><label>Summary EN</label><input className="input" value={s.summary_en} onChange={e=>setS({...s,summary_en:e.target.value})} required /></div>
        <div><label>Summary FR</label><input className="input" value={s.summary_fr} onChange={e=>setS({...s,summary_fr:e.target.value})} required /></div>
      </div>
      <div><label>Image URL</label><input className="input" value={s.imageUrl} onChange={e=>setS({...s,imageUrl:e.target.value})} placeholder="/uploads/..." /></div>
      <div className="row">
        <div><label>Body EN</label><textarea className="input" style={{minHeight:140}} value={s.body_en} onChange={e=>setS({...s,body_en:e.target.value})} /></div>
        <div><label>Body FR</label><textarea className="input" style={{minHeight:140}} value={s.body_fr} onChange={e=>setS({...s,body_fr:e.target.value})} /></div>
      </div>
      {err && <div className="toast">{err}</div>}
      {msg && <div className="toast">{msg}</div>}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button className="btn btnPrimary" type="submit">Save</button>
        {s.id && <button className="btn" type="button" onClick={del}>Delete</button>}
      </div>
    </form>
  );
}
