import { TCacheDataSignature } from "../enums/CacheDataSignature";
import { storage } from "../storage/storage";
import { getCacheKey } from "./getCacheKey";

export const invalidateCache = (cacheSignature: TCacheDataSignature) => {
  const cacheKey = getCacheKey(cacheSignature);
  storage.removeItem(cacheKey);
};
