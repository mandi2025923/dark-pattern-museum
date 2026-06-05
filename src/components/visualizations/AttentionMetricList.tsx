import { attentionMetrics } from "@/data/attentionMetrics";

export function AttentionMetricList() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {attentionMetrics.map((metric) => (
        <article
          key={metric.id}
          className="border border-museum-border bg-museum-panel/60 p-5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-muted">
            {metric.label}
          </p>
          <p className="mt-4 font-display text-4xl text-museum-text">
            {metric.value}
            <span className="ml-2 font-mono text-sm text-museum-neon">
              {metric.unit}
            </span>
          </p>
          <p className="mt-4 text-sm leading-6 text-museum-muted">
            {metric.commentary}
          </p>
        </article>
      ))}
    </div>
  );
}
