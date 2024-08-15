import type { TypeFromEnum } from "@services/utils";
import type { getSudoku } from "sudoku-gen";

export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  EXPERT: "expert",
} as const;

export type TDifficulty = TypeFromEnum<typeof Difficulty> extends Required<Parameters<typeof getSudoku>[0]>
  ? TypeFromEnum<typeof Difficulty>
  : never;
