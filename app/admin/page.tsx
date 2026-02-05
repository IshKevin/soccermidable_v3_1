import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
export default async function AdminHome() {
  const admin = await requireAdmin();
  if (!admin) {
    return (
      <div className="card" style={{padding:18,maxWidth:680}}>
        <h2 style={{marginTop:0}}>Admin</h2>
        <p className="small">Please login to access the CMS.</p>
        <Link className="btn btnPrimary" href="/admin/login">Login</Link>
      </div>
    );
  }
  return (
    <div className="card" style={{padding:18}}>
      <h2 style={{marginTop:0}}>Dashboard</h2>
      <p className="small">CMS ready: Programs + Leads + Settings + Upload API. Blog & Testimonials scaffold present.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <Link className="btn" href="/admin/settings">Settings</Link>
        <Link className="btn" href="/admin/programs">Programs</Link>
        <Link className="btn" href="/admin/leads">Leads</Link>
      </div>
    </div>
  );
}
