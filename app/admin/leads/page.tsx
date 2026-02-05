import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export default async function Page(){
  const a=await requireAdmin(); if(!a) redirect("/admin/login");
  const leads = await prisma.lead.findMany({ orderBy:{ createdAt:"desc" }, take: 200 });
  return (
    <div className="card" style={{padding:18}}>
      <h2 style={{marginTop:0}}>Leads</h2>
      <div className="small">Last 200 leads (contact/newsletter/widget).</div>
      <div style={{marginTop:12,display:"grid",gap:10}}>
        {leads.map(l=>(
          <div key={l.id} className="toast">
            <div style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
              <div style={{fontWeight:900}}>{l.email || l.phone || l.name || "Lead"}</div>
              <div className="small">{new Date(l.createdAt).toLocaleString()}</div>
            </div>
            {l.message && <div className="small" style={{marginTop:6}}>{l.message}</div>}
            <div className="small" style={{marginTop:6}}>Source: {l.source||"-"} | Locale: {l.locale||"-"}</div>
          </div>
        ))}
        {leads.length===0 && <div className="small">No leads yet.</div>}
      </div>
    </div>
  );
}
