"use client";
import { useState } from "react";
import PostForm from "./ui";

export default function PostManager({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData);
    const [editing, setEditing] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);

    if (editing || isNew) {
        return <PostForm item={editing} onSave={() => window.location.reload()} />;
    }

    return (
        <div className="card">
            <div style={{ padding: 14, display: "grid", gap: 10 }}>
                <button className="btn btnPrimary" onClick={() => setIsNew(true)}>Add New Post</button>
                {items.map(p => (
                    <div key={p.id} className="toast" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                        <div>
                            <div style={{ fontWeight: 900 }}>{p.title_en}</div>
                            <div className="small">{p.slug} | {p.published ? "Published" : "Draft"}</div>
                        </div>
                        <button className="pill" onClick={() => setEditing(p)}>Edit</button>
                    </div>
                ))}
                {items.length === 0 && <div className="small">No posts yet.</div>}
            </div>
        </div>
    );
}
