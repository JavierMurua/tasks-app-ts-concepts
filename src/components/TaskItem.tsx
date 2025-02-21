// src\components\TaskItem.tsx
"use client";
import { useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/context/TaskContext";
import { clsx } from "clsx";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300); // Retrasa la eliminación para la animación
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() !== "") {
      editTask(task.id, editedTitle);
      setIsEditing(false);
    }
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
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border rounded p-1 text-lg"
          />
        ) : (
          <h3 className={clsx("text-lg font-semibold", task.completed && "text-gray-800 line-through")}>
            {task.title}
          </h3>
        )}
        <p className="text-sm text-gray-800">{task.createdAt.toLocaleString()}</p>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}

        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Unmark" : "Complete"}
        </button>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
