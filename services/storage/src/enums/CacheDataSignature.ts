export const CacheDataSignature = {
  TASK_LIST: "task-list",
  CRYPTOGRAM_ROUND_KEY: "cryptogram-round-key",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
