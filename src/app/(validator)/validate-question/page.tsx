"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS, GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { VALIDATE_TASK } from "@/graphql/mutations/tasks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ValidatorSidebar from "@/components/molecules/validator-sidebar";
import type { Task } from "@/graphql/types/tasks";

export default function ValidateQuestionPage() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [validateQuestionTask] = useMutation(VALIDATE_TASK);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationResult, setMutationResult] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  
  // Query detail task
  const { data: taskDetail, loading: loadingTaskDetail } = useQuery(
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
    return (
      <p className="text-center text-red-300">Error: {error.message}</p>
    );
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

  // Lakukan validasi
  const handleValidation = async (id: string) => {
    try {
      const { data } = await validateQuestionTask({
        variables: { id },
      });
      if (data?.validateQuestionTask) {
        setMutationResult(data.validateQuestionTask);
      }
      alert("Task updated successfully!");
      refetch();
    } catch (err: unknown) {
      alert(
        "Error updating task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
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

        {/* Modal untuk Update Validation */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white text-black max-w-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Update Validation
              </DialogTitle>
            </DialogHeader>
            {loadingTaskDetail ? (
              <p>Loading task details...</p>
            ) : taskDetail?.getTaskById ? (
              <div className="space-y-4">
                {/* Tampilan interaktif untuk scenario */}
                <div className="p-4 border rounded bg-gray-100">
                  <p className="mb-2 font-semibold">Scenario:</p>
                  <p>{taskDetail.getTaskById.question.scenario}</p>
                </div>
                {taskDetail.getTaskById.description && (
                  <div className="p-4 border rounded bg-gray-100">
                    <p className="mb-2 font-semibold">Description:</p>
                    <p>{taskDetail.getTaskById.description}</p>
                  </div>
                )}
                <div className="p-4 border rounded bg-gray-100">
                  <p className="mb-2 font-semibold">Answers:</p>
                  <div className="space-y-2 ml-4">
                    {taskDetail.getTaskById.answers.map(
                      (answerObj, index) => (
                        <p key={index}>
                          {answerObj.answer}{" "}
                          {answerObj.stats && `(${answerObj.stats})`}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={() =>
                      handleValidation(taskDetail.getTaskById.id)
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Validate
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : mutationResult ? (
              <div className="space-y-4">
                <div className="p-4 border rounded bg-gray-100">
                  <p className="mb-2 font-semibold">Scenario:</p>
                  <p>{mutationResult.question.scenario}</p>
                </div>
                {mutationResult.description && (
                  <div className="p-4 border rounded bg-gray-100">
                    <p className="mb-2 font-semibold">Description:</p>
                    <p>{mutationResult.description}</p>
                  </div>
                )}
                <div className="p-4 border rounded bg-gray-100">
                  <p className="mb-2 font-semibold">Answers:</p>
                  <div className="space-y-2 ml-4">
                    {mutationResult.answers.map((answerObj, index) => (
                      <p key={index}>
                        {answerObj.answer}{" "}
                        {answerObj.stats && `(${answerObj.stats})`}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    Validation Status:{" "}
                    {mutationResult.isValidQuestion ? "Valid" : "Invalid"}
                  </p>
                  <Button
                    onClick={() => {
                      setMutationResult(null);
                      setIsModalOpen(false);
                    }}
                    className="mt-4 bg-gray-600 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-4">
                  Press the button below to validate the question:
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() =>
                      handleValidation(selectedTaskId || "")
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Validate
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
