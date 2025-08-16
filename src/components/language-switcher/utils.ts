import { LANGUAGES } from "@/components/shared";
import type { Language, LanguageCode } from "./types";

/**
 * Returns the list of available languages
 */
export const getAvailableLanguages = (): Language[] => {
  return [...LANGUAGES];
};

/**
 * Generates CSS classes for the language button
 */
export const getLanguageButtonClasses = (isActive: boolean): string => {
  const baseClasses = "px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200";

  if (isActive) {
    return `${baseClasses} bg-secondary text-white shadow-md transform scale-105`;
  }

  return `${baseClasses} text-secondary hover:text-gray-700 hover:bg-secondary`;
};

/**
 * Generates CSS classes for the switcher container
 */
export const getSwitcherContainerClasses = (customClassName?: string): string => {
  const baseClasses =
    "flex space-x-2 rounded-full bg-background backdrop-blur-sm p-1 shadow-sm border border-primary/50";

  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Validates if the language code is valid
 */
export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return LANGUAGES.some(lang => lang.code === code);
};
