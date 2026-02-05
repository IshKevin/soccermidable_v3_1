import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const Schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  title_en: z.string().min(2),
  title_fr: z.string().min(2),
  summary_en: z.string().min(2),
  summary_fr: z.string().min(2),
  body_en: z.string().optional().default(""),
  body_fr: z.string().optional().default(""),
  imageUrl: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(false)
});
export async function POST(req: Request) {
  const a = await requireAdmin(); if(!a) return NextResponse.json({error:"Unauthorized"},{status:401});
  const data = Schema.parse(await req.json());
  if (data.id) {
    await prisma.program.update({ where:{id:data.id}, data:{...data, imageUrl: data.imageUrl||null, isFeatured: !!data.isFeatured, body_en:data.body_en||"", body_fr:data.body_fr||""} });
  } else {
    await prisma.program.create({ data:{ slug:data.slug, title_en:data.title_en, title_fr:data.title_fr, summary_en:data.summary_en, summary_fr:data.summary_fr, body_en:data.body_en||"", body_fr:data.body_fr||"", imageUrl:data.imageUrl||null, isFeatured: !!data.isFeatured } });
  }
  return NextResponse.json({ok:true});
}
