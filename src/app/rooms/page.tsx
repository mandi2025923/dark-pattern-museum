import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { ARCHIVE_GALLERY_SLUGS } from "@/data/archiveGallery";
import { getSimulationRoom } from "@/data/simulationRooms";
import { roomRoute } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Simulation Rooms",
  description: "Controlled rooms that simulate dark patterns without collecting data.",
};

export default function RoomsPage() {
  const rooms = ARCHIVE_GALLERY_SLUGS.map((slug) => {
    const room = getSimulationRoom(slug);
    if (!room) {
      throw new Error(`Simulation room missing for gallery slug: ${slug}`);
    }
    return room;
  });

  return (
    <PageScaffold eyebrow="Simulation Rooms" title="Controlled discomfort">
      <div className="grid gap-4">
        {rooms.map((room) => (
          <Link
            key={room.slug}
            href={roomRoute(room.slug)}
            className="block border border-museum-border bg-museum-panel/60 p-5 text-museum-text transition-colors hover:border-museum-neon/50"
          >
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
              {room.patternSlug}
            </span>
            <h2 className="mt-2 font-display text-xl uppercase tracking-wider">
              {room.title}
            </h2>
            <p className="mt-2 text-sm text-museum-muted">{room.summary}</p>
          </Link>
        ))}
      </div>
    </PageScaffold>
  );
}
