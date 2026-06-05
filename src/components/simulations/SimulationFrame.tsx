import type { ReactNode } from "react";
import { WarningPanel } from "@/components/ui/WarningPanel";

type SimulationFrameProps = {
  title: string;
  safetyNote: string;
  children: ReactNode;
};

export function SimulationFrame({
  title,
  safetyNote,
  children,
}: SimulationFrameProps) {
  return (
    <section className="border border-museum-border bg-museum-panel/70 p-5">
      <div className="flex flex-col gap-3 border-b border-museum-border pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
            controlled simulation
          </p>
          <h2 className="mt-2 font-display text-2xl uppercase tracking-wider text-museum-text">
            {title}
          </h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-museum-muted">
          local only
        </span>
      </div>
      <div className="py-8">{children}</div>
      <WarningPanel title="Safety boundary">{safetyNote}</WarningPanel>
    </section>
  );
}
