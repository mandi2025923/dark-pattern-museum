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

  /** One dossier per id — no feed-derived duplicate rows on the index. */
  const galleryRecords = useMemo(() => {
    const seen = new Set<string>();
    return records.filter((record) => {
      if (seen.has(record.id)) return false;
      seen.add(record.id);
      return true;
    });
  }, [records]);

  return (
    <section className="relative overflow-x-hidden px-4 pb-20 pt-8 md:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,0,60,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-cyber opacity-30 [background-size:var(--grid-size)_var(--grid-size)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="border-y border-museum-border py-6">
          <SectionLabel
            index="ARCHIVE"
            title="Vertical dark gallery"
            subtitle="Four fixed dossiers. Hover for hall lighting, open a dossier for the split trap preview — no list shortcuts to records."
          />
        </div>

        <ul className="mt-10 flex list-none flex-col gap-10 p-0 md:gap-14">
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
