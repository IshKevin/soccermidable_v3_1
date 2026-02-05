"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale }: { locale: "fr" | "en" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const swap = pathname.replace(/^\/(fr|en)/, `/${other}`);
  const t = locale === "fr"
    ? { programs: "Programmes", impact: "Impact", about: "Qui sommes-nous", contact: "Contact", cta: "Inscription" }
    : { programs: "Programs", impact: "Impact", about: "About", contact: "Contact", cta: "Register" };
  return (
    <div className="nav">
      <div className="container navInner">
        <Link className="logo" href={`/${locale}`} style={{ padding: "8px 0" }}>
          <img src="/images/logo-purple.jpeg" alt="SoccerMidable" style={{ height: 110, width: "auto", borderRadius: 16 }} />
          <span>SoccerMidable</span>
        </Link>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Link className="pill" href={`/${locale}/programs`}>{t.programs}</Link>
          <Link className="pill" href={`/${locale}/impact`}>{t.impact}</Link>
          <Link className="pill" href={`/${locale}/about`}>{t.about}</Link>
          <Link className="pill" href={`/${locale}/contact`}>{t.contact}</Link>
          <Link className="btn btnPrimary" href={`/${locale}/contact`}>{t.cta}</Link>
          <Link className="pill" href={swap}>{other.toUpperCase()}</Link>
        </div>
      </div>
    </div>
  );
}
