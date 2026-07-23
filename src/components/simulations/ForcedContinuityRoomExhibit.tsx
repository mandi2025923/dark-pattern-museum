"use client";

import { ForcedContinuityModal } from "@/components/simulations/ForcedContinuityModal";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import type { SimulationRoom } from "@/types/museum";

type ForcedContinuityRoomExhibitProps = {
  room: SimulationRoom;
};

export function ForcedContinuityRoomExhibit({ room }: ForcedContinuityRoomExhibitProps) {
  return (
    <SimulationFrame title={room.title} safetyNote={room.safetyNote}>
      <div className="max-w-2xl space-y-5 text-sm leading-7 text-museum-muted">
        <p>{room.summary}</p>
        <p>
          Free trials that convert into paid subscriptions without a clear heads-up are
          one of the most lucrative dark patterns in the subscription economy. The
          mechanic is simple: ask for a credit card upfront, bury the auto-renewal terms
          in grey text below the bright CTA, and count on the user forgetting. By the
          time the first charge hits, the trial period is a distant memory.
        </p>
        <p>
          This pattern exploits a specific cognitive blind spot: humans are bad at
          keeping track of future obligations, especially ones they agreed to when their
          attention was elsewhere. The interface helps them forget — the renewal date
          isn&apos;t in the calendar, the reminder email lands in the promotions tab, and
          the charge appears on a statement most people don&apos;t check line by line.
          Forgetting becomes part of the revenue model.
        </p>
        <p>
          Regulation is catching up. The EU&apos;s Consumer Rights Directive now requires
          explicit renewal confirmation, and California&apos;s auto-renewal law mandates
          clear cancellation mechanisms. But enforcement is patchy, and the pattern
          remains widespread — because it works.
        </p>
      </div>

      <div className="mt-10">
        <ForcedContinuityModal open minHeightClass="min-h-[420px]" layout="embedded" />
      </div>
    </SimulationFrame>
  );
}
