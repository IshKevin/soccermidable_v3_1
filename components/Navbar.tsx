"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar({ locale }: { locale: "fr" | "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const swap = pathname.replace(/^\/(fr|en)/, `/${other}`);
  const t = locale === "fr"
    ? { programs: "Programmes", impact: "Impact", blog: "Blog", about: "Qui sommes-nous", contact: "Contact", cta: "Inscription" }
    : { programs: "Programs", impact: "Impact", blog: "Blog", about: "About", contact: "Contact", cta: "Register" };
  return (
    <div className="nav">
      <style>{`
        .nav-links { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .hamburger { display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: inherit; padding: 8px; }
        @media (max-width: 768px) {
          .navInner { flex-wrap: wrap; }
          .hamburger { display: block; margin-left: auto; }
          .nav-links {
            display: ${isOpen ? "flex" : "none"};
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            padding-top: 16px;
            gap: 16px;
          }
          .nav-links .pill, .nav-links .btn { text-align: center; display: block; }
        }
      `}</style>
      <div className="container navInner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Link className="logo" href={`/${locale}`} style={{ padding: "8px 0" }}>
          <img src="/images/logo-purple.jpeg" alt="SoccerMidable" className="logoImg" />
          <span>SoccerMidable</span>
        </Link>
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? "✕" : "☰"}
        </button>
        <div className="nav-links">
          <Link className="pill" href={`/${locale}/programs`} onClick={() => setIsOpen(false)}>{t.programs}</Link>
          <Link className="pill" href={`/${locale}/blog`} onClick={() => setIsOpen(false)}>{t.blog}</Link>
          <Link className="pill" href={`/${locale}/impact`} onClick={() => setIsOpen(false)}>{t.impact}</Link>
          <Link className="pill" href={`/${locale}/about`} onClick={() => setIsOpen(false)}>{t.about}</Link>
          <Link className="pill" href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>{t.contact}</Link>
          <Link className="btn btnPrimary" href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>{t.cta}</Link>
          <Link className="pill" href={swap} onClick={() => setIsOpen(false)}>{other.toUpperCase()}</Link>
        </div>
      </div>
    </div>
  );
}
