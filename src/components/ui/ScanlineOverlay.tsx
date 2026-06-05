"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScanlineOverlay() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 scan-overlay opacity-30" />
      <div
        className="pointer-events-none fixed left-0 right-0 z-50 h-px bg-museum-scan/20 animate-scan"
        aria-hidden
      />
    </>
  );
}
