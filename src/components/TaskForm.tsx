// src/components/TaskForm.tsx
"use client";
import { useState, ChangeEvent, FormEvent, useEffect} from "react";
import { useTasks } from "@/context/TaskContext";
import { useSettings } from "@/context/SettingsContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function TaskForm() {
  const { addTask, error, tasks } = useTasks();
  const { settings } = useSettings();
  const { t } = useTranslation();

  // 📌 2. Primitive types in TypeScript (string)
  //    - `useState<string>("")` explicitly indicates that the `title` state is of type `string`.
  const [title, setTitle] = useState<string>("");

  const isTaskLimitReached = tasks.length >= settings.maxTasks;

  useEffect(() => {
    if (isTaskLimitReached) {
      setTitle("");
    }
  }, [isTaskLimitReached]);

  // 📌 28. Differences in onChange based on input type
  //    - `ChangeEvent<HTMLInputElement>` is used to handle changes in "text" type inputs.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTaskLimitReached) {
      setTitle(e.target.value);
    };
  };

  // 📌 31. Summary of event types in React with TypeScript
  //    - `FormEvent<HTMLFormElement>` ensures the event comes from a form.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isTaskLimitReached) {
      return; // No hacer nada si se alcanzó el límite
    }
    
    // 📌 10. Advantages of typing in TypeScript (type safety and autocompletion)
    //    - Using `useState<string>("")` and `FormEvent<HTMLFormElement>` ensures type safety and provides better autocompletion.
    if (isTaskLimitReached || !title.trim()) return;

    addTask(title.trim());

    // 📌 26. Do not modify the state directly
    //    - Instead of modifying `title` directly, `setTitle("")` is used to safely update the state.
    setTitle("");
  };

  return (
    <div className="mb-6">
      <form
        className="flex flex-wrap gap-4 justify-center items-center w-full"
        onSubmit={handleSubmit}  // 📌 31. Typing of the onSubmit event in a form
      >
        <input
          type="text"
          placeholder={isTaskLimitReached ? t('taskLimitReached') : t('taskPlaceholder')}
          value={title}
          onChange={handleChange} // 📌 28. Typing of the onChange event in a "text" type <input>
          disabled={isTaskLimitReached}
          className="flex-grow p-2 rounded-md border border-var(--border)
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-gray-950 min-w-[200px] max-w-[600px]"
          style={{ flex: "1 1 250px" }} // Min 250px, se expande hasta llenar el espacio disponible
        />
        <button
          type="submit"
          disabled={isTaskLimitReached}
          aria-disabled={isTaskLimitReached}
          aria-label={t('addTask')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 min-w-[120px]"
        >
          {t('addTask')}
        </button>
      </form>
      {(error || isTaskLimitReached) && (
        <div className="mt-2 text-red-500 text-sm animate-fade-in text-center">
          {isTaskLimitReached ? t('taskLimitReachedMessage') : error}
        </div>
      )}
    </div>
  );
}