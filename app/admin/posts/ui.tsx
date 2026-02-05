"use client";
import { useState } from "react";

export default function PostForm({ item, onSave }: { item?: any, onSave: () => void }) {
    const [s, setS] = useState({
        id: item?.id || "",
        slug: item?.slug || "",
        title_en: item?.title_en || "",
        title_fr: item?.title_fr || "",
        excerpt_en: item?.excerpt_en || "",
        excerpt_fr: item?.excerpt_fr || "",
        body_en: item?.body_en || "",
        body_fr: item?.body_fr || "",
        coverUrl: item?.coverUrl || "",
        published: !!item?.published
    });
    const [loading, setLoading] = useState(false);

    async function upload(file: File) {
        const fd = new FormData(); fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const j = await res.json();
        if (j?.url) setS({ ...s, coverUrl: j.url });
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/admin/posts/save", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(s)
        });
        if (res.ok) onSave();
        else alert("Failed to save");
        setLoading(false);
    }

    async function del() {
        if (!item?.id || !confirm("Delete?")) return;
        setLoading(true);
        const res = await fetch("/admin/posts/delete", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: item.id })
        });
        if (res.ok) onSave();
        setLoading(false);
    }

    return (
        <form onSubmit={submit} className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
            <h3>{s.id ? "Edit Post" : "New Post"}</h3>
            <div className="row">
                <div><label>Slug</label><input className="input" value={s.slug} onChange={e => setS({ ...s, slug: e.target.value })} required /></div>
                <div className="toast"><label style={{ display: "flex", gap: 8, alignItems: "center", margin: 0 }}><input type="checkbox" checked={s.published} onChange={e => setS({ ...s, published: e.target.checked })} /> Published</label></div>
            </div>
            <div className="row">
                <div><label>Title EN</label><input className="input" value={s.title_en} onChange={e => setS({ ...s, title_en: e.target.value })} required /></div>
                <div><label>Title FR</label><input className="input" value={s.title_fr} onChange={e => setS({ ...s, title_fr: e.target.value })} required /></div>
            </div>
            <div>
                <label>Cover Image URL</label>
                <input className="input" value={s.coverUrl} onChange={e => setS({ ...s, coverUrl: e.target.value })} />
                <input type="file" style={{ marginTop: 6 }} onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }} />
            </div>
            <div className="row">
                <div><label>Excerpt EN</label><textarea className="input" value={s.excerpt_en} onChange={e => setS({ ...s, excerpt_en: e.target.value })} required /></div>
                <div><label>Excerpt FR</label><textarea className="input" value={s.excerpt_fr} onChange={e => setS({ ...s, excerpt_fr: e.target.value })} required /></div>
            </div>
            <div className="row">
                <div><label>Body EN</label><textarea className="input" style={{ minHeight: 180 }} value={s.body_en} onChange={e => setS({ ...s, body_en: e.target.value })} required /></div>
                <div><label>Body FR</label><textarea className="input" style={{ minHeight: 180 }} value={s.body_fr} onChange={e => setS({ ...s, body_fr: e.target.value })} required /></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btnPrimary" type="submit" disabled={loading}>Save</button>
                {s.id && <button className="btn" type="button" onClick={del} disabled={loading}>Delete</button>}
                <button className="btn" type="button" onClick={() => onSave()} disabled={loading}>Cancel</button>
            </div>
        </form>
    );
}
