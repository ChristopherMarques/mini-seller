import { MoonIcon, SunIcon, SystemIcon } from "./icons";
import type { Theme, ThemeOption } from "./types";

/**
 * Retorna a lista de opções de tema disponíveis
 */
export const getAvailableThemes = (): ThemeOption[] => {
  return [
    {
      value: "light",
      label: "Light",
      icon: SunIcon,
    },
    {
      value: "dark",
      label: "Dark",
      icon: MoonIcon,
    },
    {
      value: "system",
      label: "System",
      icon: SystemIcon,
    },
  ];
};

/**
 * Gera as classes CSS para o botão de tema
 */
export const getThemeButtonClasses = (isActive: boolean): string => {
  const baseClasses =
    "p-2 rounded-full transition-all duration-200 flex items-center justify-center";

  if (isActive) {
    return `${baseClasses} bg-secondary text-white shadow-md transform scale-105`;
  }

  return `${baseClasses} text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800`;
};

/**
 * Gera as classes CSS para o container do switcher
 */
export const getThemeSwitcherContainerClasses = (customClassName?: string): string => {
  const baseClasses =
    "flex space-x-1 rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-sm border border-primary/50 dark:bg-gray-900/80 dark:border-gray-700";

  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Valida se o tema é válido
 */
export const isValidTheme = (theme: string): theme is Theme => {
  return ["light", "dark", "system"].includes(theme);
};
