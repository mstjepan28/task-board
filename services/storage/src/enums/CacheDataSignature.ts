import type { TypeFromEnum } from "@services/utils";

export const CacheDataSignature = {
  SUDOKU_GAME: "sudoku-game",
  SUDOKU_MOVE_STACK: "sudoku-move-stack",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
  PATH_FINDER_GRID: "path-finder-grid",
  CHAT_DETAILS: "chat-details",
} as const;

export type TCacheDataSignature = TypeFromEnum<typeof CacheDataSignature>;
