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
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-secondary font-semibold mb-2">{eyebrow}</p>
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
