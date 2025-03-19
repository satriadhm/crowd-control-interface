"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { VALIDATE_TASK } from "@/graphql/mutations/tasks"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ValidatorSidebar from "@/components/molecules/validator-sidebar";

type Task = {
  id: string;
  question: string;
  description: string;
  isValidQuestion: boolean;
  answers: { answer: string; stats: number }[];
}

export default function ValidateQuestionPage() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [validateQuestionTask] = useMutation<Task>(VALIDATE_TASK);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationResult, setMutationResult] = useState<Task | null>(null);

  if (loading) return <p className="text-center text-gray-200">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-300">Error: {error.message}</p>;

  const tasksToValidate = data?.getTasks.filter((task: Task) => !task.isValidQuestion) || [];
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

  const currentTask = tasksToValidate[currentTaskIndex];

  const handleValidation = async () => {
    try {
      const { data } = await validateQuestionTask({
        variables: { id: currentTask.id },
      });
      if (data?.validateQuestionTask) {
        setMutationResult(data.validateQuestionTask);
      }
      alert("Task updated successfully!");
      setIsModalOpen(false);
      if (currentTaskIndex < tasksToValidate.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        alert("Semua task sudah divalidasi.");
      }
      refetch();
    } catch (err: unknown) {
      alert("Error updating task: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <ValidatorSidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Validate Task Question</h1>
        <div className="bg-white/10 p-6 rounded shadow mb-6">
          <p className="mb-4">
            <strong>Task Question:</strong> {currentTask.question}
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            Update Validation Status
          </Button>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Update Validation</DialogTitle>
            </DialogHeader>
            {mutationResult ? (
              <div>
                <p className="mb-4">
                  <strong>Question:</strong> {mutationResult.question}
                </p>
                <p className="mb-4">
                  <strong>Description:</strong> {mutationResult.description}
                </p>
                <p className="mb-4">
                  <strong>Validation Status:</strong>{" "}
                  {mutationResult.isValidQuestion ? "Valid" : "Invalid"}
                </p>
                <p className="mb-4">
                  <strong>Answers:</strong>
                </p>
                <ul className="mb-4 list-disc list-inside">
                  {mutationResult.answers.map((answerObj, index) => (
                    <li key={index}>
                      {answerObj.answer} {answerObj.stats && `(${answerObj.stats})`}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => {
                    setMutationResult(null);
                    setIsModalOpen(false);
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-4">
                  Press button below to validate the question:
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleValidation}
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
