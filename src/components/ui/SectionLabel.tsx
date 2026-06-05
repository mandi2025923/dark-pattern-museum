type SectionLabelProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionLabel({ index, title, subtitle }: SectionLabelProps) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs tracking-[0.3em] text-museum-neon">
        [{index}]
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-museum-text md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl font-mono text-sm text-museum-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
