// src/components/TaskItem.tsx
"use client";
import { Task } from "@/types/task";
import { useTasks } from "@/context/TaskContext";
import { clsx } from "clsx";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div
      className={clsx(
        "flex justify-between items-center p-4 rounded-lg bg-white shadow-md text-gray-900",
        task.completed && "opacity-70"
      )}
    >
      <div>
        <h3
          className={clsx(
            "text-lg font-semibold",
            task.completed && "text-gray-800"
          )}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-800">
          {task.createdAt.toLocaleString()}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Unmark" : "Complete"}
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
