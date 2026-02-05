import { NextRequest, NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(req: NextRequest) {
  const urlLocale = req.nextUrl.pathname.split("/")[1];
  if (urlLocale === "fr" || urlLocale === "en") return urlLocale;
  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  return accept.startsWith("fr") ? "fr" : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/admin") || pathname.startsWith("/widget") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }
  const hasLocale = pathname.startsWith("/fr") || pathname.startsWith("/en");
  if (!hasLocale) {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next).*)"] };
