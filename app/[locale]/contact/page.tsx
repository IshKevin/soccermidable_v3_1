import { prisma } from "@/lib/prisma";

export default async function Contact({ params, searchParams }: { params: { locale: "fr" | "en" }, searchParams: { program?: string } }) {
  const settings = await prisma.setting.findFirst();
  const isFr = params.locale === "fr";
  const title = isFr ? "Contact & inscription" : "Contact & registration";
  const sub = isFr ? "Réponse rapide via WhatsApp ou email. Laissez vos infos: on vous rappelle." : "Fast reply via WhatsApp or email. Leave your details: we'll call back.";
  const program = searchParams?.program || "";
  return (
    <div className="container" style={{ padding: "26px 0" }}>
      <h1 className="hTitle" style={{ fontSize: 34 }}>{title}</h1>
      <p className="hSub">{sub}</p>

      <div className="grid2">
        <div className="card" style={{ padding: 18 }}>
          <form action="/api/lead" method="post" style={{ display: "grid", gap: 12 }}>
            <div className="row">
              <div><label>{isFr ? "Nom" : "Name"}</label><input className="input" name="name" /></div>
              <div><label>{isFr ? "Téléphone" : "Phone"}</label><input className="input" name="phone" /></div>
            </div>
            <div><label>Email</label><input className="input" name="email" /></div>
            <div><label>{isFr ? "Message" : "Message"}</label><textarea className="input" style={{ minHeight: 140 }} name="message" defaultValue={program ? (isFr ? `Je veux des infos sur le programme: ${program}` : `I want info about program: ${program}`) : ""} /></div>
            <input type="hidden" name="locale" value={params.locale} />
            <input type="hidden" name="source" value="contact" />
            <button className="btn btnPrimary" type="submit">{isFr ? "Envoyer" : "Send"}</button>
          </form>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>{isFr ? "Coordonnées" : "Contacts"}</div>
          <div className="small">Email: <b>{settings?.contactEmail || "info@soccermidable.ca"}</b></div>
          <div className="small" style={{ marginTop: 6 }}>Phone: <b>{settings?.contactPhone || "+1 (000) 000-0000"}</b></div>
          <div className="small" style={{ marginTop: 6 }}>WhatsApp: <b>{settings?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}</b></div>
          <div className="toast" style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 900 }}>{isFr ? "Conseil ROI" : "ROI tip"}</div>
            <div className="small">{isFr ? "Chaque lead reçu est enregistré dans le CMS (Admin > Leads)." : "Every lead is saved in the CMS (Admin > Leads)."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
