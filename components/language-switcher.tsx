"use client"

import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const languages = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ]

  return (
    <div className="flex space-x-2 rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-sm border border-gray-200">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ${
            i18n.resolvedLanguage === lang.code
              ? "bg-[#A073FA] text-white shadow-md transform scale-105"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
