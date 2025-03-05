// src\types\task.ts
// 📌 Type definition for task objects  
//    → Ensures consistent and safe data handling for tasks in the application
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

// 📌 Literal types for task filtering  
//    → Enables safe and consistent task filtering by allowing only predefined filter values ("all", "completed", "pending")
export type TaskFilter = "all" | "completed" | "pending";