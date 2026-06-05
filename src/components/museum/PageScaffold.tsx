import type { ReactNode } from "react";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageScaffold({ eyebrow, title, children }: PageScaffoldProps) {
  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-20 md:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-museum-neon">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase tracking-wider text-museum-text md:text-6xl">
        {title}
      </h1>
      {children && (
        <div className="mt-8 max-w-3xl text-base leading-8 text-museum-muted">
          {children}
        </div>
      )}
    </section>
  );
}
