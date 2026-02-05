import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const phone = String(form.get("phone") || "");
  const message = String(form.get("message") || "");
  const locale = String(form.get("locale") || "");
  const source = String(form.get("source") || "");
  await prisma.lead.create({ data: { name: name||null, email: email||null, phone: phone||null, message: message||null, locale: locale||null, source: source||null } });
  return NextResponse.redirect(new URL("/thank-you", req.url));
}
