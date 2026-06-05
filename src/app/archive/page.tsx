import {
  ARCHIVE_GALLERY_SLUGS,
  getArchiveGalleryRecords,
} from "@/data/archiveGallery";
import { ArchiveGallery } from "@/sections/archive/ArchiveGallery";

export const dynamic = "force-static";

export default function ArchivePage() {
  const records = getArchiveGalleryRecords();

  if (records.length !== ARCHIVE_GALLERY_SLUGS.length) {
    throw new Error(
      `Archive gallery expected ${ARCHIVE_GALLERY_SLUGS.length} dossiers, received ${records.length}.`,
    );
  }

  return <ArchiveGallery records={records} />;
}
