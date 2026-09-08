"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createGalleryItem,
  deleteGalleryItem,
  listAllGallery,
  updateGalleryItem,
  uploadFile,
} from "@/lib/adminData";
import { GalleryItem } from "@/lib/types";

const emptyForm = {
  title: "",
  description: "",
  media_type: "image" as "image" | "video",
  storage_path: "",
  event_date: "",
  published: true,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setItems(await listAllGallery());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, "gallery", form.media_type === "image" ? "images" : "videos");
      setForm((f) => ({ ...f, storage_path: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createGalleryItem({
        title: form.title,
        description: form.description || null,
        media_type: form.media_type,
        storage_path: form.storage_path,
        event_date: form.event_date || null,
        published: form.published,
      });
      setForm(emptyForm);
      setShowForm(false);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Try again.");
    }
  }

  async function togglePublish(item: GalleryItem) {
    await updateGalleryItem(item.id, { published: !item.published });
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    await deleteGalleryItem(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-primary">Gallery</h1>
        <button onClick={() => setShowForm((v) => !v)} className="rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover">
          + Add Item
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-card bg-surface p-6 shadow-warm space-y-4 max-w-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Title</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-primary/20 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Type</label>
              <select value={form.media_type} onChange={(e) => setForm({ ...form, media_type: e.target.value as "image" | "video", storage_path: "" })}
                className="w-full rounded-lg border border-primary/20 px-4 py-2">
                <option value="image">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Description (optional)</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-primary/20 px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Event Date (optional)</label>
            <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              className="w-full rounded-lg border border-primary/20 px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Upload {form.media_type === "image" ? "Photo" : "Video"}
            </label>
            <input
              type="file"
              accept={form.media_type === "image" ? "image/*" : "video/*"}
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              className="text-sm"
            />
            {uploading && <p className="text-xs text-ink-soft mt-1">Uploading…</p>}
            {form.storage_path && <p className="text-xs text-accent mt-1">Uploaded ✓</p>}
          </div>

          {error && <p className="text-sm text-secondary-dark bg-secondary/10 rounded-lg px-3 py-2">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={!form.storage_path} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-ink-soft">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <p className="text-sm text-ink-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-ink-soft">No gallery items yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-card bg-surface shadow-warm overflow-hidden">
              {item.media_type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.storage_path} alt={item.title} className="h-36 w-full object-cover" />
              ) : (
                <video src={item.storage_path} className="h-36 w-full object-cover" muted />
              )}
              <div className="p-4">
                <p className="text-xs text-secondary font-semibold">{item.media_type === "image" ? "Photo" : "Video"}</p>
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <button onClick={() => togglePublish(item)} className={`rounded-full px-3 py-1 font-medium ${item.published ? "bg-accent/15 text-accent" : "bg-ink-soft/10 text-ink-soft"}`}>
                    {item.published ? "Published" : "Draft"}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-secondary-dark font-medium hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
