"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import TaskCard from "@/components/organism/task-card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function EvalPage() {
  const { accessToken } = useAuthStore();
  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = useQuery(GET_TASKS);
  const {
    data: userData,
    loading: loadingUser,
    error: errorUser,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });
  const router = useRouter();

  const validTasks =
    tasksData?.getTasks.filter((task) => task.isValidQuestion) || [];

  // Pagination state
  const pageSize = 6; // adjust as needed
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(validTasks.length / pageSize);
  const paginatedTasks = validTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loadingTasks || loadingUser) return <p>Loading tasks...</p>;
  if (errorTasks) return <p>Error loading tasks: {errorTasks.message}</p>;
  if (errorUser) return <p>Error loading user data: {errorUser.message}</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white min-h-screen">
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center space-x-2 text-secondary hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
      <h1 className="text-3xl font-bold mb-6">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTasks.map((task) => {
          // Cek apakah task sudah dikerjakan oleh user
          const completedTask = userData.me.completedTasks.find(
            (ct) => ct.taskId === task.id
          );
          return (
            <TaskCard
              key={task.id}
              task={task}
              completed={!!completedTask}
              answer={completedTask?.answer}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
