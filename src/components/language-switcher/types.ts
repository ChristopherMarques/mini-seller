import type { Language, LanguageCode } from "@/components/shared";

export interface LanguageSwitcherProps {
  className?: string;
}

export interface LanguageButtonProps {
  language: Language;
  isActive: boolean;
  onClick: (_code: LanguageCode) => void;
}

export type { Language, LanguageCode };
