// src\types\task.ts
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};  

export type TaskFilter = "all" | "completed" | "pending";