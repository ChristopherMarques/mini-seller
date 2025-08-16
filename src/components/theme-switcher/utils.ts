import { MoonIcon, SunIcon, SystemIcon } from "./icons";
import type { Theme, ThemeOption } from "./types";

/**
 * Returns the list of available theme options
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
 * Generates CSS classes for the theme button
 */
export const getThemeButtonClasses = (isActive: boolean): string => {
  const baseClasses =
    "p-2 rounded-full transition-all duration-200 flex items-center justify-center";

  if (isActive) {
    return `${baseClasses} bg-primary text-white shadow-md transform scale-105`;
  }

  return `${baseClasses} text-secondary hover:text-gray-700 hover:bg-gray-50  dark:hover:text-gray-200 dark:hover:bg-gray-800`;
};

/**
 * Generates CSS classes for the switcher container
 */
export const getThemeSwitcherContainerClasses = (customClassName?: string): string => {
  const baseClasses =
    "flex space-x-1 rounded-full bg-background backdrop-blur-sm p-1 shadow-sm border border-primary/50  dark:border-primary/80";

  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Validates if the theme is valid
 */
export const isValidTheme = (theme: string): theme is Theme => {
  return ["light", "dark", "system"].includes(theme);
};
