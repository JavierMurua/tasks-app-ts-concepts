// src\context\SettingsContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";


interface BaseSettings {
  darkMode: boolean;
  language: "en" | "es";
}

interface UserSettings extends BaseSettings {
  maxTasks: number;
}

const SettingsContext = createContext<{
  settings: UserSettings;
  updateSetting: <T extends keyof UserSettings>(key: T, value: UserSettings[T]) => void;
} | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("settings");
      return storedSettings ? JSON.parse(storedSettings) : { darkMode: true, language: "en", maxTasks: 10 };
    }
    return { darkMode: true, language: "en", maxTasks: 10 };
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  function updateSetting<T extends keyof UserSettings>(key: T, value: UserSettings[T]) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings debe usarse dentro de un SettingsProvider");
  }
  return context;
}