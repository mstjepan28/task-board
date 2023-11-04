import { storage } from "@shared/storage";

export const language = {
  key: "language",
  set: (newLang: string) => {
    storage.setItem(language.key, newLang);
  },
  get: () => {
    const cachedLang = storage.getItem(language.key);
    return cachedLang ? cachedLang : null;
  },
  invalidate: () => {
    storage.removeItem(language.key);
  },
};
