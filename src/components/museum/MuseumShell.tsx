import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/museum/SkipLink";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";

type MuseumShellProps = {
  children: ReactNode;
};

export function MuseumShell({ children }: MuseumShellProps) {
  return (
    <body className="relative min-h-screen overflow-x-hidden">
      <SkipLink />
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-40" />
      <ScanlineOverlay />
      <SiteHeader />
      <main id="main-content" className="relative z-10 pt-16">
        {children}
      </main>
      <SiteFooter />
    </body>
  );
}
