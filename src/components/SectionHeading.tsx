export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  neon?: boolean; // kept for backward compat, unused
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && (
        <p className="inline-block text-secondary font-bold text-xs uppercase tracking-[0.15em] mb-3 border-b-2 border-secondary/30 pb-0.5">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-soft text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
