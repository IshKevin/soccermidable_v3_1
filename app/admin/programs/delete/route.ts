import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  const a = await requireAdmin(); if(!a) return NextResponse.json({error:"Unauthorized"},{status:401});
  const { id } = await req.json();
  await prisma.program.delete({ where: { id } });
  return NextResponse.json({ ok:true });
}
