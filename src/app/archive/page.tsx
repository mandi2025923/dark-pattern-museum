import type { Metadata } from "next";
import { getArchiveGalleryRecords } from "@/data/archiveGallery";
import { ArchiveGallery } from "@/sections/archive/ArchiveGallery";

export const metadata: Metadata = {
  title: "Archive",
  description: "An interactive archive of manipulative UX patterns.",
};

export default function ArchivePage() {
  const records = getArchiveGalleryRecords();

  return <ArchiveGallery records={records} />;
}
