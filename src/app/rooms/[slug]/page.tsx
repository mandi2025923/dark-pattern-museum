import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import {
  getGallerySimulationRooms,
  getSimulationRoom,
  isGallerySimulationSlug,
} from "@/data/simulationRooms";
import { DEDICATED_SIMULATION_ROOMS } from "@/lib/simulation-exhibits";

type RoomPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getGallerySimulationRooms()
    .filter((room) => !(DEDICATED_SIMULATION_ROOMS as readonly string[]).includes(room.slug))
    .map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getSimulationRoom(slug);

  if (!room) {
    return {};
  }

  return {
    title: room.title,
    description: room.summary,
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;

  if (!isGallerySimulationSlug(slug)) {
    notFound();
  }

  const room = getSimulationRoom(slug);

  if (!room) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Simulation Room" title={room.title}>
      <SimulationFrame title={room.title} safetyNote={room.safetyNote}>
        <p>{room.summary}</p>
      </SimulationFrame>
    </PageScaffold>
  );
}
