import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { ConfirmShamingRoomExhibit } from "@/components/simulations/ConfirmShamingRoomExhibit";
import { getSimulationRoom } from "@/data/simulationRooms";

const CONFIRM_SHAMING_SLUG = "confirmshaming" as const;

export const metadata: Metadata = {
  title: "Shame Gate",
  description:
    "A fake productivity subscription trap. The interface frames consent as virtue and refusal as failure.",
};

/**
 * Dedicated linear-tour stop: /rooms/confirmshaming
 * (archive → Open room → this route). Trap UI lives inside SimulationFrame via ConfirmShamingRoomExhibit.
 */
export default function ConfirmShamingRoomPage() {
  const room = getSimulationRoom(CONFIRM_SHAMING_SLUG);

  if (!room) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Simulation Room" title={room.title}>
      <ConfirmShamingRoomExhibit room={room} />
    </PageScaffold>
  );
}
