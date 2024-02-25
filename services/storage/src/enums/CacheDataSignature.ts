export const CacheDataSignature = {
  TASK_LIST: "task-list",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
  SUDOKU_GAME: "sudoku-game",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
