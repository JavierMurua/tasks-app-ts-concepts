"use client";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import ClearTaskButton from './ClearTasksButton'

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
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
