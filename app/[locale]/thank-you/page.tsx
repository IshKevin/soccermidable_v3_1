// c:\Users\user\Downloads\SoccerMidable_v3_1_FULL_ASSETS_FIXED_STORE\soccermidable_v3_1\app\[locale]\thank-you\page.tsx
import Link from "next/link";

export default function ThankYou({ params: { locale } }: { params: { locale: "fr" | "en" } }) {
  const t = locale === "fr"
    ? { title: "Merci !", message: "Votre inscription a bien été prise en compte.", back: "Retour à l'accueil" }
    : { title: "Thank you!", message: "Your registration has been recorded.", back: "Back to home" };

  return (
    <div className="container" style={{ padding: "100px 16px", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 48, marginBottom: 24, fontWeight: 800 }}>{t.title}</h1>
      <p style={{ fontSize: 20, marginBottom: 40, maxWidth: 600, lineHeight: 1.6 }}>{t.message}</p>
      <Link href={`/${locale}`} className="btn btnPrimary">
        {t.back}
      </Link>
    </div>
  );
}
