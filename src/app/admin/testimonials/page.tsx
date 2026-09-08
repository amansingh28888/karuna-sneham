"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createTestimonial,
  deleteTestimonial,
  listAllTestimonials,
  updateTestimonial,
} from "@/lib/adminData";
import { Testimonial } from "@/lib/types";

const emptyForm = { name: "", occasion: "", message: "", published: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setItems(await listAllTestimonials());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createTestimonial({
        name: form.name,
        occasion: form.occasion || null,
        message: form.message,
        published: form.published,
      });
      setForm(emptyForm);
      setShowForm(false);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function togglePublish(t: Testimonial) {
    await updateTestimonial(t.id, { published: !t.published });
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-primary">Testimonials</h1>
        <button onClick={() => setShowForm((v) => !v)} className="rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover">
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-card bg-surface p-6 shadow-warm space-y-4 max-w-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-primary/20 px-4 py-2" />
            <input placeholder="Occasion (optional)" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}
              className="rounded-lg border border-primary/20 px-4 py-2" />
          </div>
          <textarea required rows={3} placeholder="Testimonial message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-primary/20 px-4 py-2" />

          {error && <p className="text-sm text-secondary-dark bg-secondary/10 rounded-lg px-3 py-2">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-ink-soft">Cancel</button>
          </div>
        </form>
      )}

      <div className="rounded-card bg-surface shadow-warm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-ink-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-ink-soft">No testimonials yet.</p>
        ) : (
          items.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 border-t border-primary/5 p-5 first:border-t-0">
              <div>
                <p className="font-medium text-ink">{t.name} {t.occasion && <span className="text-ink-soft font-normal">· {t.occasion}</span>}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.message}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-xs">
                <button onClick={() => togglePublish(t)} className={`rounded-full px-3 py-1 font-medium ${t.published ? "bg-accent/15 text-accent" : "bg-ink-soft/10 text-ink-soft"}`}>
                  {t.published ? "Published" : "Draft"}
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-secondary-dark font-medium hover:underline">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
