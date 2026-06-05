"use client";

import { useMemo, useState } from "react";
import { ArchiveExhibitModal } from "@/components/archive/ArchiveExhibitModal";
import { ArchiveRecordCard } from "@/components/archive/ArchiveRecordCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { ArchiveGalleryRecord } from "@/data/archiveGallery";

type ArchiveGalleryProps = {
  /** From getArchiveGalleryRecords() on the server page — single source for gallery cards. */
  records: ArchiveGalleryRecord[];
};

export function ArchiveGallery({ records }: ArchiveGalleryProps) {
  const [activePattern, setActivePattern] = useState<ArchiveGalleryRecord | null>(null);

  const galleryRecords = useMemo(() => {
    const seen = new Set<string>();
    return records.filter((record) => {
      if (seen.has(record.id)) return false;
      seen.add(record.id);
      return true;
    });
  }, [records]);

  return (
    <section
      className="relative overflow-x-hidden px-4 pb-20 pt-8 md:px-6"
      aria-labelledby="archive-gallery-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,0,60,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber opacity-30 [background-size:var(--grid-size)_var(--grid-size)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <header className="border-y border-museum-border py-6">
          <SectionLabel
            index="ARCHIVE"
            title="Vertical dark gallery"
            subtitle="Four fixed dossiers — confirm shaming, fake urgency, motel dark pattern, forced auto-renewal. Hover for hall lighting; open a card for the split trap preview."
          />
          <p id="archive-gallery-heading" className="sr-only">
            Dark pattern archive gallery
          </p>
        </header>

        <ul
          className="mt-10 flex list-none flex-col gap-10 p-0 md:gap-14"
          role="list"
          aria-label="Archive dossier cards"
        >
          {galleryRecords.map((pattern) => (
            <li key={pattern.id} className="list-none">
              <ArchiveRecordCard
                pattern={pattern}
                onOpen={() => setActivePattern(pattern)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ArchiveExhibitModal
        pattern={activePattern}
        onClose={() => setActivePattern(null)}
      />
    </section>
  );
}
