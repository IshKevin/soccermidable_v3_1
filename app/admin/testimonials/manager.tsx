"use client";
import { useState } from "react";
import TestimonialForm from "./ui";

export default function TestimonialManager({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData);
    const [editing, setEditing] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);

    if (editing || isNew) {
        return <TestimonialForm item={editing} onSave={() => window.location.reload()} />;
    }

    return (
        <div className="card">
            <div style={{ padding: 14, display: "grid", gap: 10 }}>
                <button className="btn btnPrimary" onClick={() => setIsNew(true)}>Add New Testimonial</button>
                {items.map(t => (
                    <div key={t.id} className="toast" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                        <div>
                            <div style={{ fontWeight: 900 }}>{t.name}</div>
                            <div className="small">{t.quote_en.substring(0, 100)}...</div>
                        </div>
                        <button className="pill" onClick={() => setEditing(t)}>Edit</button>
                    </div>
                ))}
                {items.length === 0 && <div className="small">No testimonials yet.</div>}
            </div>
        </div>
    );
}
