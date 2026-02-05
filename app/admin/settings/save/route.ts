import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request){
  const a=await requireAdmin(); if(!a) return NextResponse.json({error:"Unauthorized"},{status:401});
  const data = await req.json();
  const existing = await prisma.setting.findFirst();
  if(existing) await prisma.setting.update({ where:{ id: existing.id }, data });
  else await prisma.setting.create({ data });
  return NextResponse.json({ ok:true });
}
