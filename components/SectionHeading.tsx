type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-accent">
          {index}
        </span>
        <h2 className="font-mono text-xs tracking-[0.25em] text-fg-muted">
          {title}
        </h2>
      </div>
      {description && (
        <p className="hidden max-w-xs text-right font-mono text-[11px] leading-relaxed text-fg-dim md:block">
          {description}
        </p>
      )}
    </div>
  );
}
