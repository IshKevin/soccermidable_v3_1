"use client";
import { useState } from "react";

export default function TestimonialForm({ item, onSave }: { item?: any, onSave: () => void }) {
    const [s, setS] = useState({
        id: item?.id || "",
        name: item?.name || "",
        quote_en: item?.quote_en || "",
        quote_fr: item?.quote_fr || "",
        role_en: item?.role_en || "",
        role_fr: item?.role_fr || ""
    });
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/admin/testimonials/save", {
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
        const res = await fetch("/admin/testimonials/delete", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: item.id })
        });
        if (res.ok) onSave();
        setLoading(false);
    }

    return (
        <form onSubmit={submit} className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
            <h3>{s.id ? "Edit Testimonial" : "New Testimonial"}</h3>
            <div>
                <label>Name</label>
                <input className="input" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} required />
            </div>
            <div className="row">
                <div><label>Role EN</label><input className="input" value={s.role_en} onChange={e => setS({ ...s, role_en: e.target.value })} /></div>
                <div><label>Role FR</label><input className="input" value={s.role_fr} onChange={e => setS({ ...s, role_fr: e.target.value })} /></div>
            </div>
            <div>
                <label>Quote EN</label>
                <textarea className="input" value={s.quote_en} onChange={e => setS({ ...s, quote_en: e.target.value })} required />
            </div>
            <div>
                <label>Quote FR</label>
                <textarea className="input" value={s.quote_fr} onChange={e => setS({ ...s, quote_fr: e.target.value })} required />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btnPrimary" type="submit" disabled={loading}>Save</button>
                {s.id && <button className="btn" type="button" onClick={del} disabled={loading}>Delete</button>}
                <button className="btn" type="button" onClick={() => onSave()} disabled={loading}>Cancel</button>
            </div>
        </form>
    );
}
