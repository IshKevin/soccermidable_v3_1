import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const a = await requireAdmin(); if (!a) redirect("/admin/login");
  return (
    <div className="card" style={{ padding: 18 }}>
      <h2 style={{ marginTop: 0 }}>Posts</h2>
      <p className="small">Scaffold present. The Prisma model exists; implement CRUD similar to Programs if needed.</p>
    </div>
  );
}
