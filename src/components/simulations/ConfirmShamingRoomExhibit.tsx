"use client";

import { useEffect, useState } from "react";
import { ConfirmShamingModal } from "@/components/simulations/ConfirmShamingModal";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import type { SimulationRoom } from "@/types/museum";

type ConfirmShamingRoomExhibitProps = {
  room: SimulationRoom;
};

/**
 * Delay before the trap opens — lets the room frame render first during linear navigation
 * (archive → Open room → /rooms/confirmshaming), then the popup ambushes the visitor.
 */
const LINEAR_VISIT_AUTO_OPEN_MS = 550;

/**
 * Confirmshaming simulation room: auto-invokes the subscription trap on exhibit entry.
 */
export function ConfirmShamingRoomExhibit({ room }: ConfirmShamingRoomExhibitProps) {
  const [trapOpen, setTrapOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTrapOpen(true), LINEAR_VISIT_AUTO_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SimulationFrame title={room.title} safetyNote={room.safetyNote}>
      <p className="max-w-2xl text-sm leading-7 text-museum-muted">{room.summary}</p>

      {/* Trap viewport — popup mounts after linear visit delay */}
      <div className="relative mt-8">
        {!trapOpen ? (
          <p
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-museum-scan/70"
            aria-live="polite"
          >
            Initializing exhibit interface…
          </p>
        ) : null}

        <ConfirmShamingModal open={trapOpen} minHeightClass="min-h-[min(520px,70vh)]" />
      </div>
    </SimulationFrame>
  );
}
