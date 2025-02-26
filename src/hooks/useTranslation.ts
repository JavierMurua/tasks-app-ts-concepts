// src/hooks/useTranslation.ts
import { useSettings } from "@/context/SettingsContext";
import { translations } from "@/i18n/translations";

export function useTranslation() {
  const { settings } = useSettings();
  const { language } = settings;
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };
  
  return { t };
}