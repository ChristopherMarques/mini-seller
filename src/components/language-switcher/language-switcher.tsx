import { useTranslation } from "react-i18next";
import {
  getAvailableLanguages,
  getLanguageButtonClasses,
  getSwitcherContainerClasses,
} from "./utils";
import type { LanguageSwitcherProps, LanguageCode } from "./types";

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const languages = getAvailableLanguages();
  const containerClasses = getSwitcherContainerClasses(className);

  return (
    <div className={containerClasses}>
      {languages.map(language => {
        const isActive = i18n.resolvedLanguage === language.code;
        const buttonClasses = getLanguageButtonClasses(isActive);

        return (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={buttonClasses}
            aria-label={`Switch to ${language.label}`}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
