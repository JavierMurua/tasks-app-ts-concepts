// src\components\LayoutWrapper.tsx

"use client";
import { useSettings } from "@/context/SettingsContext";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  return (
    <html lang="en" className={`app-container ${settings.darkMode ? "" : "light-mode"}`} 
    data-theme={settings.darkMode ? "dark" : "light"}>
      <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
      {children}
      </body>
    </html>
  );
}
