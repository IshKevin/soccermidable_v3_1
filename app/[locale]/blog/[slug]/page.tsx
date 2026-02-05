import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { locale: "fr" | "en", slug: string } }) {
    const post = await prisma.post.findUnique({ where: { slug: params.slug } });
    if (!post || (!post.published)) notFound();

    const isFr = params.locale === "fr";

    return (
        <div className="container" style={{ padding: "40px 0" }}>
            <article style={{ maxWidth: 800, margin: "0 auto" }}>
                <h1 className="hTitle">{isFr ? post.title_fr : post.title_en}</h1>
                {post.coverUrl && <img src={post.coverUrl} style={{ width: "100%", borderRadius: 24, marginBottom: 20 }} alt="" />}
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
                    {isFr ? post.body_fr : post.body_en}
                </div>
            </article>
        </div>
    );
}
