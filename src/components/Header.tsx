// src\components\Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaCog } from "react-icons/fa";
import SettingsPanel from "./SettingsPanel";
import { useTranslation } from "@/hooks/useTranslation";
import clsx from "clsx";

export default function Header() {
  const [activePanel, setActivePanel] = useState<"menu" | "settings" | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const toggleMenu = () => setActivePanel(activePanel === "menu" ? null : "menu");
  const toggleSettings = () => setActivePanel(activePanel === "settings" ? null : "settings");

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActivePanel(null);
      }
    }

    if (activePanel) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePanel]);

  return (
    <header className="bg-[var(--background)] text-[var(--foreground)] py-4 px-6 shadow-md flex justify-between items-center animate-fade-in">
      <h1 className="text-2xl font-bold tracking-wide">📝 Task Manager</h1>

      <div className="relative">
        <button
          onClick={toggleMenu}
          aria-label={t("menu")}
          className="bg-[var(--card-bg)] text-[var(--foreground)] p-2 rounded focus:outline-none"
        >
          <span className="text-xl">&#9776;</span>
        </button>

        {activePanel === "menu" && (
          <div
            ref={menuRef}
            className={clsx(
              "absolute top-0 right-0 -mt-4  -mr-6 h-screen w-64 bg-[var(--background)] text-[var(--foreground)] z-50 shadow-xl transition-transform",
              "transform translate-x-0 ease-in-out duration-300"
            )}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">{t("menu")}</h2>
              <button
                onClick={toggleMenu}
                aria-label={t("close")}
                className="text-xl text-gray-400 hover:text-white"
              >
                &#10005;
              </button>
            </div>
            <ul className="p-4 space-y-2">
              <li>
                <button onClick={toggleSettings} className="menu-item">
                  <FaCog size={24} />
                  <span>{t("settings")}</span>
                </button>
              </li>
              <li>
                <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="menu-item">
                  <FaGithub size={24} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="menu-item">
                  <FaLinkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://tuportafolio.com" target="_blank" rel="noopener noreferrer" className="menu-item">
                  <FaGlobe size={24} />
                  <span>{t("portfolio")}</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {activePanel === "settings" && <SettingsPanel onClose={toggleSettings} />}
    </header>
  );
}