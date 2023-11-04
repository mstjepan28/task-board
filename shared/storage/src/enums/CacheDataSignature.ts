export const CacheDataSignature = {
  MOVE_ITEM: "move-item",
  PLATE_LIST: "plate-list",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
