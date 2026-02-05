export default async function Page({ params }: { params: { locale: "fr" | "en" } }) {
  const isFr = params.locale === "fr";
  return (
    <div className="container" style={{ padding: "26px 0" }}>
      <h1 className="hTitle" style={{ fontSize: 34 }}>{isFr ? "Impact" : "Impact"}</h1>
      <div className="card" style={{ padding: 18 }}>
        <div className="small" style={{ whiteSpace: "pre-wrap" }}>{isFr ? `Nous mesurons l’impact: assiduité, progression technique, confiance, esprit d’équipe.

Des événements et partenariats renforcent la communauté.

Objectif: un sport qui change des trajectoires.` : `We measure impact: attendance, technical progress, confidence, teamwork.

Events and partnerships strengthen the community.

Goal: sport that changes trajectories.`}</div>
      </div>
    </div>
  );
}
