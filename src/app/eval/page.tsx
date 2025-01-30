"use client";

import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/app/graphql/queries/tasks";
import TaskCard from "@/app/components/eval/TaskCard";

export default function EvalPage() {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.getTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
