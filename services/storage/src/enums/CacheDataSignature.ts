export const CacheDataSignature = {
  SUDOKU_GAME: "sudoku-game",
  SUDOKU_MOVE_STACK: "sudoku-move-stack",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
  PATH_FINDER_GRID: "path-finder-grid",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
