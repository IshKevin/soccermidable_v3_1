import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import "../globals.css";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <html lang="en">
      <body>
        <div className="nav">
          <div className="container navInner">
            <Link className="logo" href="/admin">
              <img src="/images/logo-purple.jpeg" alt="SoccerMidable" style={{ height: 24, width: "auto", borderRadius: 4 }} />
              Admin — SoccerMidable
            </Link>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link className="pill" href="/admin/programs">Programs</Link>
              <Link className="pill" href="/admin/posts">Blog</Link>
              <Link className="pill" href="/admin/testimonials">Testimonials</Link>
              <Link className="pill" href="/admin/leads">Leads</Link>
              <Link className="pill" href="/admin/settings">Settings</Link>
              {admin ? <Link className="pill" href="/admin/logout">Logout</Link> : <Link className="pill" href="/admin/login">Login</Link>}
            </div>
          </div>
        </div>
        <div className="container" style={{ padding: "20px 18px" }}>{children}</div>
      </body>
    </html>
  );
}
