import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage({ params }: { params: { locale: "fr" | "en" } }) {
    const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    const isFr = params.locale === "fr";
    const t = isFr ? { title: "Blog", sub: "Actualités et conseils SoccerMidable." } : { title: "Blog", sub: "SoccerMidable news and tips." };

    return (
        <div className="container" style={{ padding: "26px 0" }}>
            <h1 className="hTitle" style={{ fontSize: 34 }}>{t.title}</h1>
            <p className="hSub">{t.sub}</p>
            <div className="grid3">
                {posts.map(p => (
                    <div key={p.id} className="card">
                        {p.coverUrl && <img src={p.coverUrl} style={{ width: "100%", height: 180, objectFit: "cover" }} alt={isFr ? p.title_fr : p.title_en} />}
                        <div style={{ padding: 14 }}>
                            <div style={{ fontWeight: 900, marginBottom: 6 }}>{isFr ? p.title_fr : p.title_en}</div>
                            <div className="small">{isFr ? p.excerpt_fr : p.excerpt_en}</div>
                            <Link className="pill" style={{ display: "inline-block", marginTop: 10 }} href={`/${params.locale}/blog/${p.slug}`}>Read More</Link>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && <div className="small">No posts yet.</div>}
            </div>
        </div>
    );
}
