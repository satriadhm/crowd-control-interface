// src/app/(worker)/eval/page.tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import TaskCard from "@/components/molecules/task-card";
import { useRouter } from "next/navigation";

export default function EvalPage() {
  const { data, loading, error } = useQuery(GET_TASKS);
  const router = useRouter();

  const validTasks = data?.getTasks.filter(task => task.isValidQuestion)

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white min-h-screen">
      <button
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 bg-gradient-to-r from-tertiary to-tertiary-light text-white rounded-lg shadow hover:bg-secondary mb-6"
      >
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-6">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}