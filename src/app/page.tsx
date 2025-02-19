// src/app/page.tsx
"use client";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-500">
        📝 Gestor de Tareas
      </h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}
