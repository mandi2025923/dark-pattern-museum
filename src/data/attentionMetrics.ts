import type { AttentionMetric } from "@/types/museum";

export const attentionMetrics: AttentionMetric[] = [
  {
    id: "notifications",
    label: "Notifications",
    value: 74,
    unit: "per day",
    commentary: "Interruption is treated as a feature, not a failure.",
  },
  {
    id: "feed-refreshes",
    label: "Feed refreshes",
    value: 31,
    unit: "loops",
    commentary: "Variable reward keeps the next scroll feeling worth it.",
  },
  {
    id: "decision-pressure",
    label: "Decision pressure",
    value: 87,
    unit: "%",
    commentary: "Urgency compresses consent into reaction.",
  },
];
