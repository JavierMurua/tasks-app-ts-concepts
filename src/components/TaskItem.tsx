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
    setTimeout(() => deleteTask(task.id), 300);
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
        "task-card animate-fade-in flex justify-between items-center",
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
            className="bg-gray-700 text-white px-2 py-1 rounded w-full border text-lg"
          />
        ) : (
          <h3 className={clsx("text-lg font-semibold", task.completed && "text-gray-400")}>
            {task.title}
          </h3>
        )}
        <p className="text-sm text-gray-300">{task.createdAt.toLocaleString()}</p>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            className="button button-primary"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        ) : (
          <button
            className="button button-primary"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}

        <button
          className="button button-success"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Unmark" : "Complete"}
        </button>

        <button
          className="button button-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
