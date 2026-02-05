"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale }: { locale: "fr" | "en" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const swap = pathname.replace(/^\/(fr|en)/, `/${other}`);
  const t = locale==="fr"
    ? { programs:"Programmes", impact:"Impact", about:"Qui sommes-nous", contact:"Contact", cta:"Inscription" }
    : { programs:"Programs", impact:"Impact", about:"About", contact:"Contact", cta:"Register" };
  return (
    <div className="nav">
      <div className="container navInner">
        <Link className="logo" href={`/${locale}`}>
          <span style={{width:10,height:10,borderRadius:999,background:"linear-gradient(90deg,var(--accent),var(--accent2))",display:"inline-block"}} />
          SoccerMidable
        </Link>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
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
