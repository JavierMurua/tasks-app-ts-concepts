import { useTasks } from "@/context/TaskContext";

export default function ClearTasksButton() {
  const { clearTasks } = useTasks();

  return (
    <button
      className="mt-1 bg-red-500 text-white px-4 py-2 rounded col-span-2 sm:col-span-1 w-full sm:w-auto sm:mt-0"
            
      // 📌 31. Summary of event types in React with TypeScript  
      //    - `onClick` in a button is implicitly associated with `MouseEvent<HTMLButtonElement>`.
      onClick={() => {
        if (confirm("Are you sure you want to clear all tasks?")) {
          clearTasks();
        }
      }}
    >
      Clear All
    </button>
  );
}