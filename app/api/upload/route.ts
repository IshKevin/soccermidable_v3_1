import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as unknown as File | null;
  if (!file) return NextResponse.json({ ok:false, error:"No file" }, { status: 400 });
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name}`.replace(/[^a-zA-Z0-9._-]/g,"_");
  await writeFile(path.join(uploadsDir, safeName), buffer);
  return NextResponse.json({ ok:true, url: `/uploads/${safeName}` });
}
