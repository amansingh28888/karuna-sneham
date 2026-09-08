"use client";

import { useEffect, useState } from "react";
import { deleteContactMessage, listContactMessages, markMessageRead } from "@/lib/adminData";
import { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    setItems(await listContactMessages());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function toggleRead(m: ContactMessage) {
    await markMessageRead(m.id, !m.is_read);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await deleteContactMessage(id);
    refresh();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-6">Contact Messages</h1>

      <div className="rounded-card bg-surface shadow-warm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-ink-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-ink-soft">No messages yet.</p>
        ) : (
          items.map((m) => (
            <div key={m.id} className={`border-t border-primary/5 p-5 first:border-t-0 ${!m.is_read ? "bg-secondary/5" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">
                    {m.name} <span className="text-ink-soft font-normal">· {m.email}</span>
                  </p>
                  {m.phone && <p className="text-xs text-ink-soft">{m.phone}</p>}
                  {m.subject && <p className="mt-1 text-sm font-medium text-primary">{m.subject}</p>}
                  <p className="mt-1 text-sm text-ink-soft">{m.message}</p>
                  <p className="mt-2 text-xs text-ink-soft/70">
                    {new Date(m.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs">
                  <button onClick={() => toggleRead(m)} className={`rounded-full px-3 py-1 font-medium ${m.is_read ? "bg-ink-soft/10 text-ink-soft" : "bg-accent/15 text-accent"}`}>
                    {m.is_read ? "Read" : "Unread"}
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="text-secondary-dark font-medium hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
