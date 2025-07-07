import { create } from "zustand";

export interface LanguageState {
  lang: string;
  setLang: (lang: string) => void;
}

/**
 * Zustand store for managing the application's language globally.
 * @module LanguageStore
 */
export const useLanguageStore = create<LanguageState>(
  (set: (partial: Partial<LanguageState>) => void) => ({
    lang: "en", // Default language
    setLang: (lang: string) => set({ lang }),
  })
);
