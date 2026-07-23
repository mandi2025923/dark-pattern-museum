import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { ForcedContinuityRoomExhibit } from "@/components/simulations/ForcedContinuityRoomExhibit";
import { getSimulationRoom } from "@/data/simulationRooms";

const FORCED_CONTINUITY_SLUG = "forced-continuity" as const;

export const metadata: Metadata = {
  title: "Silent Renewal",
  description:
    "A free trial that celebrates signup while burying auto-renewal in fine print. Forgetting is the business model.",
};

export default function ForcedContinuityRoomPage() {
  const room = getSimulationRoom(FORCED_CONTINUITY_SLUG);

  if (!room) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Simulation Room" title={room.title}>
      <ForcedContinuityRoomExhibit room={room} />
    </PageScaffold>
  );
}
