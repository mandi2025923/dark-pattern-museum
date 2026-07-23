import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { MotelRoomExhibit } from "@/components/simulations/MotelRoomExhibit";
import { getSimulationRoom } from "@/data/simulationRooms";

const MOTEL_SLUG = "motel-dark-pattern" as const;

export const metadata: Metadata = {
  title: "Exit Maze",
  description:
    "Sign-up is instant. Cancellation is a phone call, a chat queue, and a retention agent who won't take no for an answer. Welcome to the roach motel.",
};

export default function MotelRoomPage() {
  const room = getSimulationRoom(MOTEL_SLUG);

  if (!room) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Simulation Room" title={room.title}>
      <MotelRoomExhibit room={room} />
    </PageScaffold>
  );
}
