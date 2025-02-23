// src\components\TaskFilter.tsx
"use client";
import { useTasks } from "@/context/TaskContext";

// 📌 4. Explicit type declaration  
//    - `TaskFilter` is a type imported from "@/types/task", which ensures that `FILTERS`  
//      only contains valid values according to the type definition.  
import type { TaskFilter } from "@/types/task"; 

// 📌 4. Explicit type declaration  
//    - It is explicitly declared that `FILTERS` is an array of `TaskFilter[]`,  
//      which guarantees that it can only contain specific values ("all", "pending", "completed").  
const FILTERS: TaskFilter[] = ["all", "pending", "completed"];

export default function TaskFilter() {
    const { filter, setFilter } = useTasks();

    return (
        <div className="flex space-x-2">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    className={`px-3 py-1 rounded ${
                        filter === f ? "bg-blue-500 text-white" : "text-black bg-gray-300"
                    }`}
                    
                    // 📌 31. Summary of event types in React with TypeScript  
                    //    - `onClick` on a button is implicitly associated with `MouseEvent<HTMLButtonElement>`.  
                    onClick={() => setFilter(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}
