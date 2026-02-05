import ProgramForm from "../ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
  const a = await requireAdmin(); if(!a) redirect("/admin/login");
  const program = await prisma.program.findUnique({ where: { id: params.id } });
  if(!program) redirect("/admin/programs");
  return (<div className="card" style={{padding:18}}><h2 style={{marginTop:0}}>Edit Program</h2><ProgramForm program={program} /></div>);
}
