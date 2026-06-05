import type { DarkPattern } from "@/types/museum";

export type DarkPatternCategory = DarkPattern;

/** Museum catalogue — aligned with archive gallery (four dossiers only). */
export const darkPatterns: DarkPattern[] = [
  {
    id: "confirmshaming",
    slug: "confirmshaming",
    title: "Confirm Shaming",
    titleEn: "Confirm Shaming",
    description:
      "The decline option is designed to make you feel guilty or foolish.",
    criticalTheme: "Language is used as pressure, not explanation.",
    realWorldInspiredExample: "Newsletter popups where the decline button insults the user.",
    emotionalEffect: "Guilt, irritation, hesitation.",
    simulationType: "confirmshaming",
    status: "planned",
    threatLevel: 3,
  },
  {
    id: "fake-urgency",
    slug: "fake-urgency",
    title: "Fake Urgency",
    titleEn: "Fake Urgency",
    description: "Artificial countdowns and stock anxiety manufactured to rush consent.",
    criticalTheme: "Artificial scarcity compresses decision-making time.",
    realWorldInspiredExample: "Booking and shopping interfaces that show expiring timers or low-stock warnings.",
    emotionalEffect: "Panic, fear of missing out, rushed consent.",
    simulationType: "fake-urgency",
    status: "planned",
    threatLevel: 5,
  },
  {
    id: "motel-dark-pattern",
    slug: "motel-dark-pattern",
    title: "Motel Dark Pattern",
    titleEn: "Motel Dark Pattern",
    description:
      "Easy to enter, nearly impossible to leave — subscriptions and memberships trap users behind layered exit friction.",
    criticalTheme: "Exit is engineered to be harder than entry.",
    realWorldInspiredExample:
      "Services you can subscribe to in one click but must call, chat, or complete surveys to cancel.",
    emotionalEffect: "Frustration, fatigue, resignation, learned helplessness.",
    simulationType: "motel-dark-pattern",
    status: "planned",
    threatLevel: 4,
  },
  {
    id: "forced-continuity",
    slug: "forced-continuity",
    title: "Forced Continuity",
    titleEn: "Forced Continuity",
    description: "Free trials quietly convert into paid subscriptions.",
    criticalTheme: "Forgetting becomes part of the business model.",
    realWorldInspiredExample: "Free trials that auto-convert without a clear reminder or cancellation path.",
    emotionalEffect: "Surprise, regret, mistrust.",
    simulationType: "forced-continuity",
    status: "planned",
    threatLevel: 4,
  },
];

export const darkPatternCategories = darkPatterns;

export function getDarkPattern(slug: string) {
  return darkPatterns.find((pattern) => pattern.slug === slug);
}
