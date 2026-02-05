import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const cookieName = "sm_admin";
const key = () => new TextEncoder().encode(process.env.JWT_SECRET || "");
export async function createSession(payload: { email: string }) {
  const token = await new SignJWT(payload).setProtectedHeader({ alg:"HS256" }).setIssuedAt().setExpirationTime("7d").sign(key());
  cookies().set(cookieName, token, { httpOnly:true, secure: process.env.NODE_ENV==="production", sameSite:"lax", path:"/" });
}
export async function destroySession(){ cookies().set(cookieName, "", { path:"/", maxAge:0 }); }
export async function requireAdmin(){
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, key()); return payload as { email:string }; } catch { return null; }
}
