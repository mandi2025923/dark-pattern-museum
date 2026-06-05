import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { FakeUrgencyRoomExhibit } from "@/components/simulations/FakeUrgencyRoomExhibit";
import { getSimulationRoom } from "@/data/simulationRooms";

const FAKE_URGENCY_SLUG = "fake-urgency" as const;

export const metadata: Metadata = {
  title: "Pressure Timer",
  description:
    "A theatrical countdown and low-stock warning. The interface compresses your decision window before you can evaluate the offer.",
};

/**
 * Dedicated linear-tour stop: /rooms/fake-urgency
 * (archive → Open room → this route). Trap UI lives inside SimulationFrame via FakeUrgencyRoomExhibit.
 */
export default function FakeUrgencyRoomPage() {
  const room = getSimulationRoom(FAKE_URGENCY_SLUG);

  if (!room) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Simulation Room" title={room.title}>
      <FakeUrgencyRoomExhibit room={room} />
    </PageScaffold>
  );
}
