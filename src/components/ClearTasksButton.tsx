import { useTasks } from "@/context/TaskContext";

export default function ClearTasksButton() {
  const { clearTasks } = useTasks();

  return (
    <button
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
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
