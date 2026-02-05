import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!adminEmail || !hash) return NextResponse.json({ error:"Admin credentials not configured" }, { status: 500 });
  if (String(email).toLowerCase() !== adminEmail.toLowerCase()) return NextResponse.json({ error:"Invalid credentials" }, { status: 401 });
  const ok = await bcrypt.compare(String(password||""), hash);
  if (!ok) return NextResponse.json({ error:"Invalid credentials" }, { status: 401 });
  await createSession({ email: adminEmail });
  return NextResponse.json({ ok:true });
}
