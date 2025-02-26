// src\components\SettingsPanel.tsx
import { useSettings } from "@/context/SettingsContext";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-gray-800 text-white shadow-lg z-50 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">{t('settings')}</h2>
        <button onClick={onClose} className="text-xl text-gray-400 hover:text-white">
          <FaTimes />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <label className="flex justify-between items-center">
          <span>{t('darkMode')}</span>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => updateSetting("darkMode", !settings.darkMode)}
          />
        </label>

        <label className="flex justify-between items-center">
          <span>{t('language')}</span>
          <select
            className="text-black"
            value={settings.language}
            onChange={(e) => updateSetting("language", e.target.value as "en" | "es")}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        <label className="flex justify-between items-center">
          <span>{t('maxTasks')}</span>
          <input
            className="text-black"
            type="number"
            value={settings.maxTasks}
            min={1}
            max={100}
            onChange={(e) => updateSetting("maxTasks", Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}