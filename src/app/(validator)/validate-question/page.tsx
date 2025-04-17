"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS, GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { Button } from "@/components/ui/button";
import ValidatorSidebar from "@/components/molecules/validator/validator-sidebar";
import ValidationDialog from "@/components/molecules/validator/validation-dialog";
import type { Task } from "@/graphql/types/tasks";

export default function ValidateQuestionPage() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Query detail task
  const { data: taskDetailData, loading: loadingTaskDetail } = useQuery(
    GET_TASK_BY_ID,
    {
      variables: { id: selectedTaskId },
      skip: !selectedTaskId,
    }
  );

  if (loading) {
    return <p className="text-center text-gray-200">Loading tasks...</p>;
  }
  if (error) {
    return <p className="text-center text-red-300">Error: {error.message}</p>;
  }

  // Filter tasks yang belum divalidasi
  const tasksToValidate: Task[] =
    data?.getTasks.filter((task: Task) => !task.isValidQuestion) || [];

  if (tasksToValidate.length === 0) {
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <ValidatorSidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <p className="bg-white/10 p-4 rounded shadow">
            Tidak ada task yang perlu divalidasi saat ini.
          </p>
        </main>
      </div>
    );
  }

  const totalPages = Math.ceil(tasksToValidate.length / pageSize);
  const paginatedTasks = tasksToValidate.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Fungsi untuk navigasi pagination
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Buka modal & set ID task yang dipilih
  const handleOpenModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <ValidatorSidebar />

      <main className="flex-1 p-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Validate Task Question</h1>

          {/* Grid untuk menampilkan task card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white/10 p-6 rounded shadow hover:shadow-lg transition-shadow duration-300"
              >
                <p className="mb-2 font-semibold">Task Scenario:</p>
                <p className="ml-4 mb-4">{task.question.scenario}</p>
                <Button onClick={() => handleOpenModal(task.id)}>
                  Update Validation Status
                </Button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Prev
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Validation Dialog */}
        <ValidationDialog
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          selectedTaskId={selectedTaskId}
          taskDetail={taskDetailData?.getTaskById}
          loadingTaskDetail={loadingTaskDetail}
          onValidationComplete={refetch}
        />
      </main>
    </div>
  );
}
