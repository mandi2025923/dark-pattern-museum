import type { Metadata } from "next";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { AttentionMetricList } from "@/components/visualizations/AttentionMetricList";

export const metadata: Metadata = {
  title: "Attention Economy",
  description: "A placeholder visualization layer for attention extraction patterns.",
};

export default function AttentionPage() {
  return (
    <PageScaffold eyebrow="Attention Economy" title="Extraction made visible">
      <AttentionMetricList />
    </PageScaffold>
  );
}
