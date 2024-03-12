import type { TCacheDataSignature } from "../enums/CacheDataSignature";

export const CACHE_KEY_PREFIX = "cache";

export const getCacheKey = (targetCache: TCacheDataSignature) => {
  return `${CACHE_KEY_PREFIX}-${targetCache}` as const;
};
