import type { Metadata } from "next";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { AttentionMetricList } from "@/components/visualizations/AttentionMetricList";

export const metadata: Metadata = {
  title: "Attention Economy",
  description: "Your attention is a commodity. Here are the numbers behind the extraction machine.",
};

/** Same metrics as rendered by AttentionMetricList — used here for the closing note. */
const SOURCES = [
  { label: "Push notifications", source: "Pielot et al. (2014) — large-scale smartphone notification study" },
  { label: "Feed refresh loops", source: "Variable-ratio reinforcement schedules (Skinner, 1957); applied to social feeds by Eyal (2014)" },
  { label: "Decision pressure", source: "Mathur et al. (2019) — 11K e-commerce site crawl documenting fake urgency prevalence" },
] as const;

export default function AttentionPage() {
  return (
    <PageScaffold eyebrow="Attention Economy" title="Extraction made visible">
      <div className="space-y-10">
        <section>
          <p className="text-base leading-7 text-museum-text/85">
            Platforms don&apos;t make money when you find what you need and leave. They make
            money when you stay, scroll, and come back. Everything on this page is
            infrastructure for extracting attention — notifications that pull you back in,
            feeds that never end, countdowns that bypass your judgment. The numbers below
            are estimates based on published research, but the exact figures don&apos;t matter as
            much as the pattern: your attention is being farmed at industrial scale.
          </p>
        </section>

        <AttentionMetricList />

        <section className="border-t border-museum-border pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
            where these numbers come from
          </p>
          <ul className="mt-4 space-y-3">
            {SOURCES.map((item) => (
              <li key={item.label} className="border border-museum-border bg-museum-panel/40 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-museum-scan">
                  {item.label}
                </span>
                <p className="mt-1 text-sm leading-6 text-museum-muted">
                  {item.source}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-museum-text/70">
            These are not the metrics of your specific device. They are research averages
            meant to make the extraction visible — to give you a number to compare against
            your own experience. Next time your phone buzzes, ask: was that for me, or for
            the platform?
          </p>
        </section>
      </div>
    </PageScaffold>
  );
}
