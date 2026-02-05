import HeroVideo from "@/components/HeroVideo";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home({ params }: { params: { locale: "fr" | "en" } }) {
  const settings = await prisma.setting.findFirst();
  const programs = await prisma.program.findMany({ where: { isFeatured: true }, take: 3, orderBy: { createdAt: "desc" } });
  const testimonials = await prisma.testimonial.findMany({ take: 3, orderBy: { createdAt: "desc" } });

  const t = params.locale === "fr" ? {
    title: "Le football comme école de confiance.",
    sub: "SoccerMidable aide les jeunes à progresser vite — technique, mental, discipline — avec une culture inclusive et des coachs exigeants.",
    cta1: "Inscrire mon enfant",
    cta2: "Voir les programmes",
    k1: "Programmes structurés",
    k2: "Coachs orientés progrès",
    k3: "Communauté & valeurs",
    k4: "Impact mesurable",
    featured: "Programmes phares",
    proof: "Ils en parlent"
  } : {
    title: "Soccer as a school of confidence.",
    sub: "SoccerMidable helps youth improve fast — technique, mindset, discipline — with an inclusive culture and demanding coaches.",
    cta1: "Register now",
    cta2: "Explore programs",
    k1: "Structured programs",
    k2: "Progress-first coaches",
    k3: "Community & values",
    k4: "Measurable impact",
    featured: "Featured programs",
    proof: "What people say"
  };

  return (
    <>
      <section className="hero">
        <div className="container grid2">
          <div>
            <h1 className="hTitle">{t.title}</h1>
            <p className="hSub">{t.sub}</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Link className="btn btnPrimary" href={`/${params.locale}/contact`}>{t.cta1}</Link>
              <Link className="btn" href={`/${params.locale}/programs`}>{t.cta2}</Link>
            </div>

            <div className="section">
              <div className="kpiGrid">
                <div className="card kpi"><b>01</b><div className="small">{t.k1}</div></div>
                <div className="card kpi"><b>02</b><div className="small">{t.k2}</div></div>
                <div className="card kpi"><b>03</b><div className="small">{t.k3}</div></div>
                <div className="card kpi"><b>04</b><div className="small">{t.k4}</div></div>
              </div>
            </div>
          </div>

          <div>
            <HeroVideo src={settings?.heroVideoUrl || null} poster={settings?.heroPosterUrl || null} />
            <div className="small" style={{marginTop:10}}>
              Domain: <b>{settings?.domain || "soccermidable.ca"}</b>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">{t.featured}</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {programs.map(p => (
              <div key={p.id} className="card" style={{padding:14}}>
                <div style={{fontWeight:900,marginBottom:6}}>{params.locale==="fr" ? p.title_fr : p.title_en}</div>
                <div className="small">{params.locale==="fr" ? p.summary_fr : p.summary_en}</div>
                <Link className="pill" style={{display:"inline-block",marginTop:10}} href={`/${params.locale}/programs#${p.slug}`}>Details</Link>
              </div>
            ))}
          </div>

          <div style={{marginTop:22}}>
            <h2 className="sectionTitle">{t.proof}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {testimonials.map(x => (
                <div key={x.id} className="card" style={{padding:14}}>
                  <div style={{fontWeight:900}}>{x.name}</div>
                  <div className="small" style={{marginTop:6}}>{params.locale==="fr" ? x.quote_fr : x.quote_en}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
