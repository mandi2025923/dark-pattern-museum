"use client";

import { MotelExhibit } from "@/components/simulations/MotelExhibit";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import type { SimulationRoom } from "@/types/museum";

type MotelRoomExhibitProps = {
  room: SimulationRoom;
};

export function MotelRoomExhibit({ room }: MotelRoomExhibitProps) {
  return (
    <SimulationFrame title={room.title} safetyNote={room.safetyNote}>
      <div className="max-w-2xl space-y-5 text-sm leading-7 text-museum-muted">
        <p>{room.summary}</p>
        <p>
          This pattern is named after the roach motel — a pest trap with the slogan
          &ldquo;roaches check in, but they don&apos;t check out.&rdquo; Online, the same
          dynamic plays out when companies make sign-up frictionless and cancellation
          deliberately painful. Gym memberships you can buy online but only cancel in
          person. Streaming services where the cancel button is buried under account
          settings, a chat queue, and a retention agent who has a script designed to
          wear you down.
        </p>
        <p>
          What makes this pattern different from simply having a bad UX flow is the
          asymmetry. The company invested significant engineering effort to make the
          subscription path smooth, prominent, and one-click. That same engineering
          budget was deliberately not spent on the cancellation path. The friction
          isn&apos;t an accident. It&apos;s the business model.
        </p>
      </div>

      <div className="mt-10">
        <MotelExhibit open minHeightClass="min-h-[420px]" layout="embedded" />
      </div>
    </SimulationFrame>
  );
}
