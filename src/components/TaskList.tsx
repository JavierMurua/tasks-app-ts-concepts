// src\components\TaskList.tsx
"use client";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import ClearTaskButton from './ClearTasksButton'

export default function TaskList() {

  const { tasks } = useTasks();

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:flex gap-2 mb-6 w-full sm:w-auto">
        <TaskFilter />
        <ClearTaskButton />
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-200 mt-4">
          No tasks found! 📝
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}