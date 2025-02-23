// src\types\task.ts
// 📌 Definition of types for objects  
//    → `type` is used to structure data safely (Typing of data lists) 
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

// 📌 Literal types  
//    → `TaskFilter` only accepts specific values: "all", "completed" or "pending"  
export type TaskFilter = "all" | "completed" | "pending";