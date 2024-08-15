export const RepeatCycle = {
  NEVER: "never",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
} as const;

export type TRepeatCycle = (typeof RepeatCycle)[keyof typeof RepeatCycle];
