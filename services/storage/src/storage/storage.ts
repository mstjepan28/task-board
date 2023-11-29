import { TCacheDataSignature } from "../enums/CacheDataSignature";
import { CACHE_KEY_PREFIX, getCacheKey } from "../utils/getCacheKey";

export const storage = {
  getItem: (key: TCacheDataSignature) => {
    const cacheKey = getCacheKey(key);
    const storageRes = localStorage.getItem(cacheKey);

    try {
      return storageRes ? JSON.parse(storageRes) : null;
    } catch (error) {
      return null;
    }
  },
  getAllCacheKeys: () => {
    const allStorageKeys = Object.keys(localStorage);
    return allStorageKeys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
  },
  setItem: (key: TCacheDataSignature, data: any) => {
    const cacheKey = getCacheKey(key);

    try {
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem(cacheKey, stringifiedData);
    } catch (error) {
      console.error(`Failed to set item ${key} in local storage: ${error}`);
    }
  },
  removeItem: (key: TCacheDataSignature) => {
    const cacheKey = getCacheKey(key);
    localStorage.removeItem(cacheKey);
  },
  removeAllCacheItems: () => {
    const allCacheKeys = storage.getAllCacheKeys();
    allCacheKeys.forEach((key) => localStorage.removeItem(key));
  },
};
