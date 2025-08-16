import { useTheme } from "@/contexts/theme-provider";
import {
  getAvailableThemes,
  getThemeButtonClasses,
  getThemeSwitcherContainerClasses,
} from "./utils";
import type { ThemeSwitcherProps, Theme } from "./types";

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const themes = getAvailableThemes();
  const containerClasses = getThemeSwitcherContainerClasses(className);

  return (
    <div className={containerClasses}>
      {themes.map(themeOption => {
        const isActive = theme === themeOption.value;
        const buttonClasses = getThemeButtonClasses(isActive);
        const IconComponent = themeOption.icon;

        return (
          <button
            key={themeOption.value}
            onClick={() => handleThemeChange(themeOption.value)}
            className={buttonClasses}
            aria-label={`Switch to ${themeOption.label} theme`}
            title={`${themeOption.label} theme`}
          >
            <IconComponent className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;
