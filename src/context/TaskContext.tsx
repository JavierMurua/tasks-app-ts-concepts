// src\context\TaskContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Task, TaskFilter } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import { useSettings } from "@/context/SettingsContext";
import { translations } from "@/i18n/translations";

// 📌 Type definition for objects  
//    - TaskContextType defines the structure of the context, enabling type safety for functions and states.
type TaskContextType = {
  tasks: Task[]; // ✅ Array typing (using [])
  addTask: (title: string) => void; // ✅ Function parameter typing
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
  editTask: (id: string, newTitle: string) => void;
  filter: TaskFilter; // ✅ Literal types
  setFilter: (filter: TaskFilter) => void;
  error: string | null;
};

// 📌 Creating context with types  
//    - TaskContext uses TaskContextType to enforce type safety.
const TaskContext = createContext<TaskContextType | undefined>(undefined);

const getStoredTasks = (): Task[] => {
  if (typeof window === "undefined") return []; // Evita errores en SSR
  const storedTasks = localStorage.getItem("tasks");
  if (!storedTasks) return [];
  return JSON.parse(storedTasks, (key, value) =>
    key === "createdAt" ? new Date(value) : value
  );
};

// 📌 Typing props in React with ReactNode  
//    - Ensures that the provider's props are correctly typed.
export const TaskProvider = ({ children }: { children: ReactNode }) => {
// 📌 Using useState<T> to define typed states  
//    - Ensures that tasks is always an array of Task.
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);
    // 📌 Typing states with restricted values  
  //    - TaskFilter only allows "all" | "completed" | "pending", preventing invalid values. 
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [error, setError] = useState<string | null>(null);
  const { settings } = useSettings(); 

  // 📌 Function to sort tasks  
  //    - Using sort() on a typed array (Task[]).   
  const sortTasks = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.completed ? 1 : -1;
    });
  };

  // 📌 Using effects (useEffect) with TypeScript  
//    - Manages side effects, such as saving tasks to local storage.
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, 300);
    return () => clearTimeout(timeout);
  }, [tasks]);

  // 📌 Typing parameters in functions  
//    - Ensures that addTask takes a string parameter.  
  const addTask = (title: string) => {
    if (tasks.length >= settings.maxTasks) {
      const errorMessage = settings.language === 'en' 
        ? translations.en.taskLimitReached 
        : translations.es.taskLimitReached;
      
      setError(errorMessage);
      
      setTimeout(() => setError(null), 3000);
      return;
    }

    const newTask: Task = { id: uuidv4(), title, completed: false, createdAt: new Date() };
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      return updatedTasks.length > 1 ? sortTasks(updatedTasks) : updatedTasks;
    });
  };


  // 📌 Using `map()` on a typed array (`Task[]`)  
  //    - It ensures that `task` always has the structure defined in `Task`.  
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      sortTasks(
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  // 📌 Typing `filter()` on a typed array  
  //    - It guarantees that `task.id` is always of type `string`.   
  const deleteTask = (id: string) => {
    setTasks((prev) => sortTasks(prev.filter((task) => task.id !== id)));
  };

  // 📌 Using typed states to filter data   
  const clearTasks = () => setTasks([]);

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      sortTasks(
        prev.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      )
    );
  };

  // 📌 Using typed states to filter data   
const filterMap: Record<TaskFilter, (task: Task) => boolean> = {
  all: () => true,
  completed: (task) => task.completed,
  pending: (task) => !task.completed,
};

const filteredTasks = tasks.filter(filterMap[filter]);


  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        clearTasks,
        editTask,
        filter,
        setFilter,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// 📌 Use of useContext in TypeScript  
//    - Ensures that the context is not undefined before usage.
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

/*
🔹 Concepts applied:
✅ Type definition for objects (Index: 12)
✅ Typing lists of data (Task[]) (Index: 23)
✅ Typing props in React with ReactNode (Index: 20)
✅ Using useState<T> to define typed states (Index: 25)
✅ Typing parameters in functions (Index: 7)
✅ Using effects (useEffect) with TypeScript (Index: 25)
✅ Creating context with types (createContext) (Index: 19)
*/ 