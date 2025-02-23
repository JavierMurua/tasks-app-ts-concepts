// src\components\TaskList.tsx
"use client";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import ClearTaskButton from './ClearTasksButton'

// 📌 Uso de `export default function` con TypeScript  
//    - Se define `TaskList` como una función de React sin necesidad de tipado explícito  
export default function TaskList() {
  // 📌 Uso de `useContext` con TypeScript  
  //    - `useTasks` retorna un objeto con `tasks`, el cual está tipado en `TaskContextType`  
  const { tasks } = useTasks();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <TaskFilter />
        <ClearTaskButton />
      </div>

      {/* 📌 Tipado de `tasks.length === 0` con TypeScript  
          - `tasks` es un arreglo tipado (`Task[]`), por lo que `tasks.length` siempre será un `number` */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-200 mt-4">
          No tasks found! 📝
        </p>
      ) : (
        <div className="space-y-4">
          {/* 📌 Uso de `map()` en un array tipado (`Task[]`)  
              - `task` siempre tendrá la estructura definida en `Task` (id, title, completed, createdAt) */}
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}