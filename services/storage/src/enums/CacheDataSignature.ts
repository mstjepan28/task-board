export const CacheDataSignature = {
  SUDOKU_GAME: "sudoku-game",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
