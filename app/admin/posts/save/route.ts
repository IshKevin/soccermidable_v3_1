import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const a = await requireAdmin(); if (!a) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await req.json();
    const payload = {
        slug: data.slug,
        title_en: data.title_en,
        title_fr: data.title_fr,
        excerpt_en: data.excerpt_en,
        excerpt_fr: data.excerpt_fr,
        body_en: data.body_en,
        body_fr: data.body_fr,
        coverUrl: data.coverUrl || null,
        published: !!data.published
    };
    if (data.id) {
        await prisma.post.update({ where: { id: data.id }, data: payload });
    } else {
        await prisma.post.create({ data: payload });
    }
    return NextResponse.json({ ok: true });
}
