import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function Page(){
  const admin = await requireAdmin(); if(!admin) redirect("/admin/login");
  const items = await prisma.program.findMany({ orderBy:{ createdAt:"desc" }});
  return (
    <div style={{display:"grid",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <h2 style={{margin:0}}>Programs</h2>
        <Link className="btn btnPrimary" href="/admin/programs/new">New</Link>
      </div>
      <div className="card"><div style={{padding:14,display:"grid",gap:10}}>
        {items.map(p=>(
          <div key={p.id} className="toast" style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
            <div>
              <div style={{fontWeight:900}}>{p.title_en} <span className="small">({p.slug})</span></div>
              <div className="small">{p.summary_en}</div>
            </div>
            <Link className="pill" href={`/admin/programs/${p.id}`}>Edit</Link>
          </div>
        ))}
        {items.length===0 && <div className="small">No programs yet.</div>}
      </div></div>
    </div>
  );
}
