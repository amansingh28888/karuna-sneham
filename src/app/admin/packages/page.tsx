"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createPackage,
  deletePackage,
  listAllPackages,
  updatePackage,
  uploadFile,
} from "@/lib/adminData";
import { Package } from "@/lib/types";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  features: "",
  children_supported: "",
  image_url: "",
  sort_order: "0",
  active: true,
};

export default function AdminPackagesPage() {
  const [items, setItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setItems(await listAllPackages());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function startAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(p: Package) {
    setForm({
      name: p.name,
      price: String(p.price),
      description: p.description,
      features: p.features.join("\n"),
      children_supported: String(p.children_supported),
      image_url: p.image_url ?? "",
      sort_order: String(p.sort_order),
      active: p.active,
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, "site-assets", "packages");
      setForm((f) => ({ ...f, image_url: url }));
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
      const payload = {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
        children_supported: Number(form.children_supported),
        image_url: form.image_url || null,
        sort_order: Number(form.sort_order),
        active: form.active,
      };
      if (editingId) {
        await updatePackage(editingId, payload);
      } else {
        await createPackage(payload);
      }
      setShowForm(false);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Try again.");
    }
  }

  async function toggleActive(p: Package) {
    await updatePackage(p.id, { active: !p.active });
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this package?")) return;
    await deletePackage(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-primary">Packages</h1>
        <button onClick={startAdd} className="rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover">
          + Add Package
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-card bg-surface p-6 shadow-warm space-y-4 max-w-2xl">
          <h2 className="font-display text-lg text-primary">{editingId ? "Edit Package" : "New Package"}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            </Field>
            <Field label="Price (₹)">
              <input required type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" />
            </Field>
            <Field label="Children Supported">
              <input required type="number" min={0} value={form.children_supported} onChange={(e) => setForm({ ...form, children_supported: e.target.value })} className="input" />
            </Field>
            <Field label="Sort Order">
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="input" />
            </Field>
          </div>

          <Field label="Description">
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </Field>

          <Field label="Features (one per line)">
            <textarea rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="input" placeholder={"Cake and gifts\nMeal for 20 children\nPhoto + video coverage"} />
          </Field>

          <Field label="Package Image">
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} className="text-sm" />
            {uploading && <p className="text-xs text-ink-soft mt-1">Uploading…</p>}
          </Field>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active (visible on website)
          </label>

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
          <p className="p-6 text-sm text-ink-soft">No packages yet — add one, or import from your catalog.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-background text-left text-ink-soft">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Children</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-primary/5">
                  <td className="px-5 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-3 text-ink-soft">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3 text-ink-soft">{p.children_supported}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleActive(p)} className={`rounded-full px-3 py-1 text-xs font-medium ${p.active ? "bg-accent/15 text-accent" : "bg-ink-soft/10 text-ink-soft"}`}>
                      {p.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-5 py-3 space-x-3">
                    <button onClick={() => startEdit(p)} className="text-primary font-medium hover:underline">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-secondary-dark font-medium hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx global>{`
        .input { width: 100%; border-radius: 0.5rem; border: 1px solid rgba(27,58,92,0.2); padding: 0.5rem 0.9rem; outline: none; }
        .input:focus { border-color: #1b3a5c; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      {children}
    </div>
  );
}
