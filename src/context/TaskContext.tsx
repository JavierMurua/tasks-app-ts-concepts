// src\context\TaskContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Task, TaskFilter } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");

  // Función para ordenar tareas
  const sortTasks = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.completed ? 1 : -1;
    });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(
        sortTasks(
          JSON.parse(storedTasks, (key, value) =>
            key === "createdAt" ? new Date(value) : value
          )
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => sortTasks([...prev, newTask]));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      sortTasks(
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => sortTasks(prev.filter((task) => task.id !== id)));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        clearTasks,
        filter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
