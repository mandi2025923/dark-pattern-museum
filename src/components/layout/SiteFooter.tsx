import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-museum-border bg-museum-surface/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-museum-muted">
            {siteConfig.university} · {siteConfig.program}
          </p>
          <p className="mt-1 font-display text-sm text-museum-text/80">
            {siteConfig.name}
          </p>
        </div>
        <p className="max-w-md font-mono text-xs leading-relaxed text-museum-muted">
          {siteConfig.footerNotice}
        </p>
      </div>
    </footer>
  );
}
