import { prisma } from "@/lib/prisma";

export default async function Programs({ params }: { params: { locale: "fr" | "en" } }) {
  const programs = await prisma.program.findMany({ orderBy: { createdAt: "desc" } });
  const t = params.locale==="fr"
    ? { title:"Programmes", sub:"Choisissez un parcours. Nous adapterons selon l’âge et le niveau.", cta:"Demander une place" }
    : { title:"Programs", sub:"Choose a pathway. We adapt by age and level.", cta:"Request a spot" };

  return (
    <div className="container" style={{padding:"26px 0"}}>
      <h1 className="hTitle" style={{fontSize:34}}>{t.title}</h1>
      <p className="hSub">{t.sub}</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
        {programs.map(p => (
          <div key={p.id} id={p.slug} className="card" style={{padding:16}}>
            <div style={{fontWeight:900,fontSize:18}}>{params.locale==="fr" ? p.title_fr : p.title_en}</div>
            <div className="small" style={{marginTop:8}}>{params.locale==="fr" ? p.body_fr : p.body_en}</div>
            <a className="btn btnPrimary" style={{marginTop:12}} href={`/${params.locale}/contact?program=${p.slug}`}>{t.cta}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
