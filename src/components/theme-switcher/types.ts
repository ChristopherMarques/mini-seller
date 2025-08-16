import React from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeSwitcherProps {
  className?: string;
}

export interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
