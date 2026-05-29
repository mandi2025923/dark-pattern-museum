export type PatternStatus = "available" | "planned";

export type SimulationType =
  | "infinite-scroll"
  | "confirmshaming"
  | "fake-urgency"
  | "forced-continuity"
  | "notification-addiction"
  | "privacy-zuckering"
  | "algorithmic-manipulation"
  | "information-bombardment";

export type DarkPattern = {
  id: string;
  slug: SimulationType;
  title: string;
  titleEn: string;
  description: string;
  criticalTheme: string;
  realWorldInspiredExample: string;
  emotionalEffect: string;
  simulationType: SimulationType;
  status: PatternStatus;
  threatLevel: 1 | 2 | 3 | 4 | 5;
};

export type SimulationRoom = {
  slug: SimulationType;
  title: string;
  summary: string;
  patternSlug: SimulationType;
  safetyNote: string;
};

export type AttentionMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  commentary: string;
};
