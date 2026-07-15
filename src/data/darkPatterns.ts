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
    title: "Roach Motel (Hard to Cancel)",
    titleEn: "Roach Motel (Hard to Cancel)",
    description:
      "Sign-up takes one click. Cancellation takes a phone call, a chat queue, and three rounds of retention scripts.",
    criticalTheme: "The exit door is bolted shut while the entrance is wide open.",
    realWorldInspiredExample:
      "Gym memberships you can buy online but only cancel in person. Streaming services with hidden termination pages.",
    emotionalEffect: "Frustration, fatigue, the slow realisation you're being worn down on purpose.",
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
