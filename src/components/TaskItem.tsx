"use client";
import { useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/context/TaskContext";
import { clsx } from "clsx";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300);
  };

  return (
    <div
      className={clsx(
        "flex justify-between items-center p-4 rounded-lg bg-white shadow-md text-gray-900 transition-all duration-300",
        "animate-fade-in",
        task.completed && "opacity-70",
        isDeleting && "scale-90 opacity-0"
      )}
    >
      <div>
        <h3
          className={clsx(
            "text-lg font-semibold transition-all",
            task.completed && "text-gray-800 line-through"
          )}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-800">{task.createdAt.toLocaleString()}</p>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Unmark" : "Complete"}
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
