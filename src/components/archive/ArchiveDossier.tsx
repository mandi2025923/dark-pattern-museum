"use client";

import type { ReactNode } from "react";
import type { DarkPattern } from "@/types/museum";

type ArchiveDossierMetaProps = {
  pattern: DarkPattern;
  children?: ReactNode;
};

export function ArchiveDossierMeta({ pattern, children }: ArchiveDossierMetaProps) {
  return (
    <div className="space-y-4">
      <DossierField label="Manipulation method">{pattern.criticalTheme}</DossierField>
      <DossierField label="Inspired by">{pattern.realWorldInspiredExample}</DossierField>
      <DossierField label="Felt effect">{pattern.emotionalEffect}</DossierField>
      {children}
    </div>
  );
}

type DossierFieldProps = {
  label: string;
  children: string;
};

function DossierField({ label, children }: DossierFieldProps) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-museum-scan">
        {label}
      </p>
      <p className="mt-1.5 text-xs leading-5 text-museum-text/85 md:text-sm md:leading-6">
        {children}
      </p>
    </div>
  );
}
