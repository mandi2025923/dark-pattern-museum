"use client";

import { useEffect, useState } from "react";
import { FakeUrgencyModal } from "@/components/simulations/FakeUrgencyModal";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import type { SimulationRoom } from "@/types/museum";

type FakeUrgencyRoomExhibitProps = {
  room: SimulationRoom;
};

/** Linear visit delay before the urgency trap opens (matches Confirm Shaming room). */
const LINEAR_VISIT_AUTO_OPEN_MS = 550;

/**
 * Fake urgency simulation room — auto-invokes countdown modal on exhibit entry.
 */
export function FakeUrgencyRoomExhibit({ room }: FakeUrgencyRoomExhibitProps) {
  const [trapOpen, setTrapOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTrapOpen(true), LINEAR_VISIT_AUTO_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SimulationFrame title={room.title} safetyNote={room.safetyNote}>
      <p className="max-w-2xl text-sm leading-7 text-museum-muted">{room.summary}</p>

      <div className="relative mt-8">
        {!trapOpen ? (
          <p
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-museum-scan/70"
            aria-live="polite"
          >
            Initializing exhibit interface…
          </p>
        ) : null}

        <FakeUrgencyModal open={trapOpen} minHeightClass="min-h-[min(520px,70vh)]" />
      </div>
    </SimulationFrame>
  );
}
