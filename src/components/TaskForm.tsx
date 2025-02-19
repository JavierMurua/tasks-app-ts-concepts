// src/components/TaskForm.tsx
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useTasks } from "@/context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 mt-8"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={handleChange}
        className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar
      </button>
    </form>
  );
}
