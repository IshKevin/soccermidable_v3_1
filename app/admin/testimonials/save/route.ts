import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const a = await requireAdmin(); if (!a) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await req.json();
    if (data.id) {
        await prisma.testimonial.update({ where: { id: data.id }, data: { name: data.name, quote_en: data.quote_en, quote_fr: data.quote_fr, role_en: data.role_en, role_fr: data.role_fr } });
    } else {
        await prisma.testimonial.create({ data: { name: data.name, quote_en: data.quote_en, quote_fr: data.quote_fr, role_en: data.role_en, role_fr: data.role_fr } });
    }
    return NextResponse.json({ ok: true });
}
