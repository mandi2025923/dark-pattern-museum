"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SimulationSplitLayoutProps = {
  /** Left column — dossier copy, metadata */
  meta: ReactNode;
  /** Right column — trap / feed simulation */
  simulation: ReactNode;
  /** Optional right-panel classes (e.g. archive split compact preview) */
  simulationPanelClassName?: string;
};

/** Archive exhibit modal: meta left, simulation right (explanation lives in modal footer). */
export function SimulationSplitLayout({
  meta,
  simulation,
  simulationPanelClassName,
}: SimulationSplitLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] md:divide-x md:divide-museum-border">
      <div className="min-w-0 p-4">{meta}</div>
      <div
        className={cn(
          "min-w-0 border-t border-museum-border md:border-t-0",
          simulationPanelClassName ?? "p-4",
        )}
      >
        {simulation}
      </div>
    </div>
  );
}
