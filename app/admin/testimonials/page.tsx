import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TestimonialManager from "./manager";

export default async function Page() {
  const a = await requireAdmin(); if (!a) redirect("/admin/login");
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Testimonials</h2>
      </div>
      <TestimonialManager initialData={testimonials} />
    </div>
  );
}
