"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  listAllPackages,
  listAllGallery,
  listAllTestimonials,
  listContactMessages,
  getImpactStatisticsAdmin,
  updateImpactStatistics,
} from "@/lib/adminData";
import { ImpactStatistics } from "@/lib/types";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ packages: 0, gallery: 0, testimonials: 0, unread: 0 });
  const [impact, setImpact] = useState<ImpactStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      listAllPackages(),
      listAllGallery(),
      listAllTestimonials(),
      listContactMessages(),
      getImpactStatisticsAdmin(),
    ])
      .then(([packages, gallery, testimonials, messages, impactData]) => {
        setCounts({
          packages: packages.length,
          gallery: gallery.length,
          testimonials: testimonials.length,
          unread: messages.filter((m) => !m.is_read).length,
        });
        setImpact(impactData);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleImpactSubmit(e: FormEvent) {
    e.preventDefault();
    if (!impact) return;
    setSaving(true);
    setSaved(false);
    await updateImpactStatistics({
      children_supported: impact.children_supported,
      events_organized: impact.events_organized,
      meals_distributed: impact.meals_distributed,
      volunteers: impact.volunteers,
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-6">Dashboard</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard label="Total Packages" value={counts.packages} loading={loading} />
        <StatCard label="Total Gallery Items" value={counts.gallery} loading={loading} />
        <StatCard label="Testimonials" value={counts.testimonials} loading={loading} />
        <StatCard label="Unread Messages" value={counts.unread} loading={loading} />
      </div>

      <h2 className="font-display text-lg text-primary mb-4">Impact Statistics</h2>
      <p className="text-sm text-ink-soft mb-4">
        These numbers appear on the homepage and donate page.
      </p>

      {impact && (
        <form onSubmit={handleImpactSubmit} className="rounded-card bg-surface p-6 shadow-warm grid gap-4 sm:grid-cols-2 max-w-xl">
          {(
            [
              ["children_supported", "Children Supported"],
              ["events_organized", "Events Organized"],
              ["meals_distributed", "Meals Distributed"],
              ["volunteers", "Volunteers"],
            ] as [keyof ImpactStatistics, string][]
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">{label}</label>
              <input
                type="number"
                min={0}
                value={impact[key] as number}
                onChange={(e) => setImpact({ ...impact, [key]: Number(e.target.value) })}
                className="w-full rounded-lg border border-primary/20 px-4 py-2"
              />
            </div>
          ))}
          <div className="sm:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {saved && <span className="text-sm text-accent">Saved.</span>}
          </div>
        </form>
      )}
    </div>
  );
}

function StatCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="rounded-card bg-surface p-6 shadow-warm">
      <p className="font-display text-3xl text-secondary">{loading ? "…" : value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}
