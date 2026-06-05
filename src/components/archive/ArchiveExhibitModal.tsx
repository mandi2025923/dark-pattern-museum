"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArchiveDossierMeta } from "@/components/archive/ArchiveDossier";
import { PatternSimulation } from "@/components/archive/PatternSimulation";
import { SimulationSplitLayout } from "@/components/archive/SimulationSplitLayout";
import { CyberButton } from "@/components/ui/CyberButton";
import type { ArchiveGalleryRecord } from "@/data/archiveGallery";
import {
  isDedicatedSimulationRoom,
  isInteractiveDossierSimulation,
} from "@/lib/simulation-exhibits";
import { archiveRoute, roomRoute } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Archive modal right panels that must fit without vertical scroll. */
const COMPACT_SIMULATION_PREVIEW_SLUGS = new Set(["fake-urgency", "motel-dark-pattern"]);

type ArchiveExhibitModalProps = {
  pattern: ArchiveGalleryRecord | null;
  onClose: () => void;
};

export function ArchiveExhibitModal({ pattern, onClose }: ArchiveExhibitModalProps) {
  const reducedMotion = useReducedMotion();
  const open = pattern !== null;
  const [footerExplanation, setFooterExplanation] = useState<ReactNode | null>(null);

  useEffect(() => {
    if (!open) setFooterExplanation(null);
  }, [open, pattern?.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const usesDedicatedRoom = pattern ? isDedicatedSimulationRoom(pattern.slug) : false;
  const usesInteractiveTrap = pattern
    ? isInteractiveDossierSimulation(pattern.simulationType)
    : false;
  const compactSimulationPreview = pattern
    ? COMPACT_SIMULATION_PREVIEW_SLUGS.has(pattern.simulationType)
    : false;

  return (
    <AnimatePresence>
      {open && pattern ? (
        <motion.div
          key={pattern.id}
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-museum-void/88 backdrop-blur-sm"
            aria-label="Close exhibit"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`archive-modal-${pattern.id}`}
            className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-4xl flex-col overflow-hidden border border-museum-neon/40 bg-museum-panel shadow-neon"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-museum-neon/25 bg-museum-neon/5 px-4 py-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-neon">
                  dossier_{String(pattern.galleryIndex).padStart(2, "0")} · {pattern.galleryLabel}
                </p>
                <h2
                  id={`archive-modal-${pattern.id}`}
                  className="mt-1 font-display text-lg uppercase tracking-wider text-museum-text md:text-xl"
                >
                  {pattern.titleEn}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 border border-museum-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-museum-muted transition-colors hover:border-museum-neon hover:text-museum-neon"
              >
                Close ×
              </button>
            </header>

            <div
              className={cn(
                "min-h-0 flex-1",
                compactSimulationPreview ? "overflow-hidden" : "overflow-y-auto",
              )}
            >
              <SimulationSplitLayout
                simulationPanelClassName={
                  compactSimulationPreview
                    ? "overflow-hidden p-2 md:w-[340px] md:max-w-[340px] md:shrink-0"
                    : undefined
                }
                meta={
                  <ArchiveDossierMeta pattern={pattern}>
                    <div className="mt-6 grid gap-2">
                      <div className="w-full [&_a]:flex [&_a]:w-full [&_a]:justify-center">
                        <CyberButton
                          href={
                            usesDedicatedRoom
                              ? roomRoute(pattern.slug)
                              : roomRoute(pattern.simulationType)
                          }
                        >
                          {usesDedicatedRoom ? "Enter simulation room" : "Open room"}
                        </CyberButton>
                      </div>
                      <Link
                        href={archiveRoute(pattern.slug)}
                        className="inline-flex w-full items-center justify-center border border-museum-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-museum-muted transition-colors hover:border-museum-neon hover:text-museum-neon"
                      >
                        Read full record →
                      </Link>
                    </div>
                  </ArchiveDossierMeta>
                }
                simulation={
                  <div
                    className={cn(
                      "border border-museum-border bg-museum-void/50",
                      compactSimulationPreview ? "overflow-hidden p-0" : "p-3",
                    )}
                  >
                    <PatternSimulation
                      type={pattern.simulationType}
                      variant={usesInteractiveTrap ? "interactive" : "preview"}
                      layout="split"
                      onExplanation={setFooterExplanation}
                    />
                  </div>
                }
              />
            </div>

            <AnimatePresence>
              {footerExplanation ? (
                <motion.div
                  key="archive-explanation-footer"
                  className="shrink-0 border-t border-museum-neon/30 bg-museum-void/95"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                >
                  {footerExplanation}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
