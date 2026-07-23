import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Vertical dark gallery — four dossiers on confirm shaming, fake urgency, roach motel (hard to cancel), and forced auto-renewal.",
};

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
