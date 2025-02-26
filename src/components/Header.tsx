// src\components\Header.tsx
"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaCog } from "react-icons/fa";
import SettingsPanel from "./SettingsPanel"; // 
import { useTranslation } from "@/hooks/useTranslation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 py-4 px-6 shadow-md text-white flex justify-between items-center animate-fade-in">
      <h1 className="text-2xl font-bold tracking-wide">📝 Task Manager</h1>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="bg-gray-700 p-2 rounded focus:outline-none"
        >
          <span className="text-xl">&#9776;</span>
        </button>

        {isMenuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 shadow-xl transform transition-transform ease-in-out duration-300">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">{t('menu')}</h2>
              <button
                onClick={toggleMenu}
                className="text-xl text-gray-400 hover:text-white"
              >
                &#10005;
              </button>
            </div>
            <ul className="space-y-6 p-4">
              <li className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300">
                <button
                  onClick={toggleSettings}
                  className="flex items-center space-x-3 text-lg w-full text-left"
                >
                  <FaCog size={24} />
                  <span>{t('settings')}</span>
                </button>
              </li>
              <li className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300">
                <a
                  href="https://github.com/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-lg"
                >
                  <FaGithub size={24} />
                  <span>GitHub</span>
                </a>
              </li>
              <li className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300">
                <a
                  href="https://www.linkedin.com/in/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-lg"
                >
                  <FaLinkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300">
                <a
                  href="https://tuportafolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-lg"
                >
                  <FaGlobe size={24} />
                  <span>{t('portfolio')}</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isSettingsOpen && <SettingsPanel onClose={toggleSettings} />}
    </header>
  );
}
