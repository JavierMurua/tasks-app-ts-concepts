// src\components\TaskItem.tsx
"use client";
import { useState, useCallback } from "react";
import { Task } from "@/types/task";  // 📌 22. Share types between components
//    - The `Task` type exported from `task.ts` is reused to correctly type the task data.

import { useTasks } from "@/context/TaskContext";
import { clsx } from "clsx";
import { useTranslation } from "@/hooks/useTranslation";

type TaskItemProps = {
  task: Task;  // 📌 19. Why type props in React?
  //    - It ensures that `task` has the structure defined in `Task`, preventing errors when accessing its properties.
};

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const { t } = useTranslation();

  // 📌 3. Static typing in TypeScript
  //    - `useState` automatically infers the state type based on the initial value.
  const [isDeleting, setIsDeleting] = useState(false);  // Infers that it is `boolean`
  const [isEditing, setIsEditing] = useState(false);    // Infers that it is `boolean`
  const [editedTitle, setEditedTitle] = useState(task.title);  // Infers that it is `string`

  const formattedDate = new Date(task.createdAt).toLocaleString();

  // 📌 27. Typing the onChange event in an <input>
  //    - The `onChange` event in `setEditedTitle(e.target.value)` expects a `string`.
  const handleDelete = useCallback(() => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300);
  }, [task.id, deleteTask]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = useCallback(() => {
    if (editedTitle.trim() !== "") {
      editTask(task.id, editedTitle);  // 📌 5. Robust typing system in TypeScript
      //    - Ensures that `editTask` always receives a `string`, preventing unexpected errors.

      setIsEditing(false);
    }
  }, [task.id, editedTitle, editTask]);

  return (
    <div
      className={clsx(
        "task-card animate-fade-in flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4",
        task.completed && "opacity-70",
        isDeleting && "scale-90 opacity-0"
      )}
    >
      <div className="w-full sm:flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="px-2 py-1 rounded w-full border text-lg"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
            autoFocus
          />
        ) : (
          <h3 className={clsx("text-lg font-semibold break-words", task.completed && "text-gray-400")}
          tabIndex={0}
          >
            {task.title}
          </h3>
        )}
        <p className="text-sm text-gray-400">{formattedDate}</p> 
        {/* 📌 6. Type conversion */}
        {/* - `createdAt` is a `Date` object, and it is converted to `string` using `toLocaleString()`. */}
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
        {isEditing ? (
          <button
            className="button button-primary w-full sm:w-auto"
            onClick={handleSaveEdit}  
            // 📌 29. Typing the onSubmit event in a form
            //    - `onClick` expects a function with no parameters, which in this case is `handleSaveEdit`.
          >
            {t('save')}
          </button>
        ) : (
          <button
            className="button button-primary w-full sm:w-auto"
            onClick={handleEdit}
            aria-label={t("edit")}
          >
            {t('edit')}
          </button>
        )}

        <button
          className="button button-success w-full sm:w-auto"
          onClick={() => toggleTask(task.id)}
          aria-label={task.completed ? t("unmark") : t("complete")}
        >
          {task.completed ? t('unmark') : t('complete')}
        </button>

        <button
          className="button button-danger col-span-2 sm:col-span-1 w-full sm:w-auto"
          onClick={handleDelete}
          aria-label={t("delete")}
          >
          {t('delete')}
        </button>
      </div>
    </div>
  );
}