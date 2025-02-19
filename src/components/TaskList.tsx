// src/components/TaskList.tsx
"use client";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-200 mt-8">
        ¡No hay tareas aún! Agrega una nueva. 📋
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
