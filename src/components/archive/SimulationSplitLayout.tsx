"use client";

import type { ReactNode } from "react";

type SimulationSplitLayoutProps = {
  /** Left column — dossier copy, metadata */
  meta: ReactNode;
  /** Right column — trap / feed simulation */
  simulation: ReactNode;
};

/** Archive exhibit modal: meta left, simulation right (explanation lives in modal footer). */
export function SimulationSplitLayout({ meta, simulation }: SimulationSplitLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] md:divide-x md:divide-museum-border">
      <div className="min-w-0 p-4">{meta}</div>
      <div className="min-w-0 border-t border-museum-border p-4 md:border-t-0">{simulation}</div>
    </div>
  );
}
