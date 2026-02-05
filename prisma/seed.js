const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const s = await prisma.setting.findFirst();
  if (!s) await prisma.setting.create({ data: {
    siteName:"SoccerMidable", domain:"soccermidable.ca",
    heroVideoUrl:"/video/hero.mp4", heroPosterUrl:"/images/hero-poster.jpg",
    contactEmail:"info@soccermidable.ca", contactPhone:"+1 (000) 000-0000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+12025550123"
  }});
  if (await prisma.program.count() === 0) await prisma.program.createMany({ data: [
    { slug:"development", title_fr:"Développement & Performance", title_en:"Development & Performance",
      summary_fr:"Progresser vite, sans pression inutile.", summary_en:"Improve fast without unnecessary pressure.",
      body_fr:"Technique, jeu, discipline, confiance.", body_en:"Technique, game intelligence, discipline, confidence.",
      imageUrl:"/images/program-1.jpg", isFeatured:true },
    { slug:"community", title_fr:"Communauté & Valeurs", title_en:"Community & Values",
      summary_fr:"Respect, inclusion, leadership.", summary_en:"Respect, inclusion, leadership.",
      body_fr:"Ateliers & événements.", body_en:"Workshops & events.",
      imageUrl:"/images/program-2.jpg", isFeatured:true }
  ]});
  if (await prisma.testimonial.count() === 0) await prisma.testimonial.createMany({ data: [
    { name:"Parent A.", role_fr:"Parent", role_en:"Parent",
      quote_fr:"Confiance et discipline en quelques semaines.", quote_en:"Confidence and discipline in a few weeks.",
      avatarUrl:"/images/avatar-1.jpg" },
    { name:"Joueur B.", role_fr:"U15", role_en:"U15",
      quote_fr:"On progresse vraiment, coaching clair.", quote_en:"Real progress, clear coaching.",
      avatarUrl:"/images/avatar-2.jpg" }
  ]});
  console.log("Seed done");
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
