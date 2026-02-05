export default async function Page({ params }: { params: { locale: "fr" | "en" } }) {
  const isFr = params.locale === "fr";
  return (
    <div className="container" style={{padding:"26px 0"}}>
      <h1 className="hTitle" style={{fontSize:34}}>{isFr ? "Qui sommes-nous" : "About us"}</h1>
      <div className="card" style={{padding:18}}>
        <div className="small" style={{whiteSpace:"pre-wrap"}}>{isFr ? `SoccerMidable est une communauté de football orientée progrès.

Nous combinons discipline, inclusion, exigence et bienveillance.

Objectif: aider chaque jeune à grandir, sur le terrain et dans la vie.` : `SoccerMidable is a progress-first soccer community.

We combine discipline, inclusion, high standards and care.

Goal: help each young player grow on the pitch and in life.`}</div>
      </div>
    </div>
  );
}
