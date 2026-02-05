import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PostManager from "./manager";

export default async function Page() {
  const a = await requireAdmin(); if (!a) redirect("/admin/login");
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Blog Posts</h2>
      </div>
      <PostManager initialData={posts} />
    </div>
  );
}
