import { LANGUAGES } from "@/components/shared";
import type { Language, LanguageCode } from "./types";

/**
 * Retorna a lista de idiomas disponíveis
 */
export const getAvailableLanguages = (): Language[] => {
  return [...LANGUAGES];
};

/**
 * Gera as classes CSS para o botão de idioma
 */
export const getLanguageButtonClasses = (isActive: boolean): string => {
  const baseClasses = "px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200";
  
  if (isActive) {
    return `${baseClasses} bg-[#A073FA] text-white shadow-md transform scale-105`;
  }
  
  return `${baseClasses} text-gray-500 hover:text-gray-700 hover:bg-gray-50`;
};

/**
 * Gera as classes CSS para o container do switcher
 */
export const getSwitcherContainerClasses = (customClassName?: string): string => {
  const baseClasses = "flex space-x-2 rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-sm border border-gray-200";
  
  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Valida se o código de idioma é válido
 */
export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return LANGUAGES.some(lang => lang.code === code);
};