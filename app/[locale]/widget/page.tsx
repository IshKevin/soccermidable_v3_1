export default function WidgetPage({ params }: { params: { locale:"fr"|"en" } }) {
  const isFr = params.locale==="fr";
  const code = `<script src="https://soccermidable.ca/widget/soccermidable.js" data-locale="${params.locale}"></script>`;
  return (
    <div className="container" style={{padding:"26px 0"}}>
      <h1 className="hTitle" style={{fontSize:34}}>{isFr?"Widget":"Widget"}</h1>
      <p className="hSub">{isFr?"Copiez-collez ce snippet sur n'importe quel site pour afficher un bouton + mini formulaire.":"Copy/paste this snippet on any site to show a button + mini form."}</p>
      <div className="card" style={{padding:18}}>
        <pre style={{whiteSpace:"pre-wrap",margin:0}}>{code}</pre>
      </div>
    </div>
  );
}
