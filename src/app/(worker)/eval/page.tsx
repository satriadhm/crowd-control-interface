"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import TaskCard from "@/components/organism/task-card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PaginationStore = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
};

// Store untuk menyimpan state pagination di sessionStorage
const usePaginationStore = create<PaginationStore>()(
  persist(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (page: number) => set({ currentPage: page }),
      resetPage: () => set({ currentPage: 1 }),
    }),
    {
      name: "eval-pagination",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return sessionStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);

export default function EvalPage() {
  const { accessToken } = useAuthStore();
  const { currentPage, setCurrentPage } = usePaginationStore();
  
  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = useQuery(GET_TASKS);
  const {
    data: userData,
    loading: loadingUser,
    error: errorUser,
    refetch: refetchUser,
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
  const totalPages = Math.ceil(validTasks.length / pageSize);
  const paginatedTasks = validTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Effect to refetch user data when returning to this page
  useEffect(() => {
    if (accessToken) {
      refetchUser();
    }
  }, [accessToken, refetchUser]);

  // Effect to ensure current page doesn't exceed total pages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
      
      {validTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-300 mb-4">No tasks available at the moment</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTasks.map((task) => {
              // Cek apakah task sudah dikerjakan oleh user
              const completedTask = userData?.me?.completedTasks?.find(
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
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page numbers */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
          
          <div className="text-center mt-4 text-sm text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, validTasks.length)} of{" "}
            {validTasks.length} tasks
          </div>
        </>
      )}
    </div>
  );
}