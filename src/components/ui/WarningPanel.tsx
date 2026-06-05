import type { ReactNode } from "react";

type WarningPanelProps = {
  title: string;
  children: ReactNode;
};

export function WarningPanel({ title, children }: WarningPanelProps) {
  return (
    <aside className="border border-museum-warning/40 bg-museum-warning/5 p-4">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-warning">
        {title}
      </p>
      <div className="mt-2 text-sm leading-6 text-museum-muted">{children}</div>
    </aside>
  );
}
