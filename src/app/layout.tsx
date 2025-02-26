//src\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";
import { SettingsProvider } from "@/context/SettingsContext";
import Header from "@/components/Header";
import LayoutWrapper from "@/components/LayoutWrapper";



export const metadata: Metadata = {
  title: "Task Manager",
  description: "Application to manage tasks with Next.js and TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <SettingsProvider>
      <TaskProvider>
        <LayoutWrapper>
          <Header />
          {children}
        </LayoutWrapper>
      </TaskProvider>
    </SettingsProvider>
  );
}
