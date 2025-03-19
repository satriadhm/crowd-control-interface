"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { UPDATE_TASK } from "@/graphql/mutations/tasks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ValidatorSidebar from "@/components/molecules/validator-sidebar";

export default function ValidateQuestionPage() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [updateTask] = useMutation(UPDATE_TASK);

  const tasksToValidate = data?.getTasks.filter((task) => !task.validated) || [];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p className="text-center text-gray-200">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-300">Error: {error.message}</p>;

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

  const handleValidation = async (isValid: boolean) => {
    try {
      await updateTask({
        variables: {
          id: currentTask.id,
          input: {
            isValidQuestion: isValid,
            validated: true,
          },
        },
      });
      alert("Task updated successfully!");
      setIsModalOpen(false);

      // Beralih ke task berikutnya (jika ada)
      if (currentTaskIndex < tasksToValidate.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        alert("Semua task sudah divalidasi.");
      }
      refetch();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error updating task: " + err.message);
      } else {
        alert("Error updating task: Unknown error");
      }
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
            <p className="mb-4">Apakah pertanyaan di atas valid?</p>
            <div className="flex space-x-4">
              <Button onClick={() => handleValidation(true)} className="bg-green-600 hover:bg-green-700">
                Valid
              </Button>
              <Button
                onClick={() => handleValidation(false)}
                variant="destructive"
              >
                Invalid
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
