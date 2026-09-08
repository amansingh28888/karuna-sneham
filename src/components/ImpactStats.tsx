import { ImpactStatistics } from "@/lib/types";

export default function ImpactStats({ stats }: { stats: ImpactStatistics }) {
  const items = [
    { label: "Children Supported", value: stats.children_supported },
    { label: "Events Organized", value: stats.events_organized },
    { label: "Meals Distributed", value: stats.meals_distributed },
    { label: "Volunteers", value: stats.volunteers },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-card bg-surface p-6 text-center shadow-warm">
          <p className="font-display text-3xl text-secondary">{i.value.toLocaleString("en-IN")}+</p>
          <p className="mt-1 text-sm text-ink-soft">{i.label}</p>
        </div>
      ))}
    </div>
  );
}
