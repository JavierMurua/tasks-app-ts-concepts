// src\components\SettingsPanel.tsx
"use client";

import { useSettings } from "@/context/SettingsContext";
import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import clsx from "clsx";

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Cierra el panel si el usuario hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        ref={panelRef}
        className={clsx(
          "w-72 h-full bg-[var(--background)] text-[var(--foreground)] shadow-lg",
          "transition-transform transform translate-x-0 border-l border-[var(--border)]"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold">{t("settings")}</h2>
          <button onClick={onClose} aria-label="Close settings" className="text-xl text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="p-4 space-y-4">
        <label className="flex justify-between items-center">
        <span>{t("darkMode")}</span>
        <button
        // 📌 13. Modifying typed objects in TypeScript  
        //    - Ensures that `updateSetting` only accepts valid keys and values from the `settings` object, maintaining strong type safety.
          onClick={() => updateSetting("darkMode", !settings.darkMode)}
          className={clsx(
            "relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300",
            settings.darkMode ? "bg-[var(--primary)]" : "bg-yellow-300"
          )}
          role="switch"
          aria-checked={settings.darkMode}
          aria-label="Toggle dark mode"
        >
          <span
            className={clsx(
              "w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300",
              settings.darkMode ? "translate-x-6" : "translate-x-0"
            )}
          />
        </button>
      </label>

          <label htmlFor="language" className="flex justify-between items-center">
            <span>{t("language")}</span>
            <select
              id="language"
              className="bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)] p-1 rounded-md"
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value as "en" | "es")}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </label>

          <label htmlFor="maxTasks" className="flex justify-between items-center">
            <span>{t("maxTasks")}</span>
            <input
              id="maxTasks"
              className="bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)] p-1 rounded-md w-16 text-center"
              type="number"
              value={settings.maxTasks}
              min={1}
              max={100}
              onChange={(e) => updateSetting("maxTasks", Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
