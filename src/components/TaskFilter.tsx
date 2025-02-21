// src\components\TaskFilter.tsx
"use client";
import { useTasks } from "@/context/TaskContext";
import type { TaskFilter } from "@/types/task";

export default function TaskFilter() {
    const { filter, setFilter } = useTasks();

    return (
        <div className="flex space-x-2">
        {["all", "pending", "completed"].map((f) => (
        <button
            key={f}
            className={`px-3 py-1 rounded ${
            filter === f ? "bg-blue-500 text-white" : "text-black bg-gray-300"
            }`}
            onClick={() => setFilter(f as TaskFilter)}
        >
            {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
        ))}
    </div>
    );
}
