"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Footer({ locale, socials }: { locale: "fr" | "en", socials: any }) {
  const router = useRouter();
  const t = locale === "fr"
    ? { newsletter: "Newsletter", email: "Email", join: "S'inscrire", widget: "Widget", admin: "Admin" }
    : { newsletter: "Newsletter", email: "Email", join: "Join", widget: "Widget", admin: "Admin" };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      await fetch("/api/lead", { method: "POST", body: formData });
      router.push(`/${locale}/thank-you`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <footer className="footer">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16 }}>
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            <img src="/images/logo-white.jpeg" alt="SoccerMidable" style={{ height: 100, width: "auto", borderRadius: 18 }} />
          </div>
          <div className="small">soccermidable.ca — FR/EN, responsive, ROI-first.</div>
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {socials?.instagram && <a className="pill" href={socials.instagram} target="_blank">Instagram</a>}
            {socials?.facebook && <a className="pill" href={socials.facebook} target="_blank">Facebook</a>}
            {socials?.youtube && <a className="pill" href={socials.youtube} target="_blank">YouTube</a>}
            {socials?.linkedin && <a className="pill" href={socials.linkedin} target="_blank">LinkedIn</a>}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>{t.newsletter}</div>
          <form onSubmit={handleSubmit} action={`/api/lead`} method="post">
            <label>{t.email}</label>
            <input className="input" name="email" type="email" required placeholder="you@email.com" />
            <input type="hidden" name="source" value="newsletter" />
            <input type="hidden" name="locale" value={locale} />
            <button type="submit" className="btn btnPrimary" style={{ marginTop: 10, width: "100%" }}>{t.join}</button>
          </form>
        </div>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Links</div>
          <div className="small" style={{ display: "grid", gap: 8 }}>
            <Link href={`/${locale}/widget`}>{t.widget}</Link>
            <Link href={`/admin`}>{t.admin}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
