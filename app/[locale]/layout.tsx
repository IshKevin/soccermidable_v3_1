import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { prisma } from "@/lib/prisma";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: { locale: "fr" | "en" } }) {
  const settings = await prisma.setting.findFirst();
  const socials = {
    instagram: settings?.instagram,
    facebook: settings?.facebook,
    youtube: settings?.youtube,
    linkedin: settings?.linkedin
  };
  return (
    <>
      <Navbar locale={params.locale} />
      {children}
      <Footer locale={params.locale} socials={socials} />
      <WhatsAppFloating locale={params.locale} number={settings?.whatsapp || null} />
    </>
  );
}
