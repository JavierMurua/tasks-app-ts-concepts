// src/app/page.tsx
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <TaskForm />
      <TaskList />
    </main>
  );
}
