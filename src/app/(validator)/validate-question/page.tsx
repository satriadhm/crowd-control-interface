"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries/tasks";
import { UPDATE_TASK } from "@/graphql/mutations/tasks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ValidateQuestionPage() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [updateTask] = useMutation(UPDATE_TASK);

  // Filter for tasks that have not been validated yet
  const tasksToValidate = data?.getTasks.filter((task) => !task.validated) || [];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // If no tasks require validation, display a message
  if (tasksToValidate.length === 0) {
    return <p>No tasks require validation at this time.</p>;
  }

  const currentTask = tasksToValidate[currentTaskIndex];

  // Handler to update the task with the validation decision.
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
      // Move to the next task if available
      if (currentTaskIndex < tasksToValidate.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        alert("No more tasks pending validation.");
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Validate Task Question</h1>
      <div className="bg-white/10 p-6 rounded shadow">
        <p className="mb-4">
          <strong>Task Question:</strong> {currentTask.question}
        </p>
        <Button onClick={() => setIsModalOpen(true)}>
          Update Validation Status
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Validation</DialogTitle>
          </DialogHeader>
          <p className="mb-4">Is the above question valid?</p>
          <div className="flex space-x-4">
            <Button onClick={() => handleValidation(true)}>Valid</Button>
            <Button onClick={() => handleValidation(false)} variant="destructive">
              Invalid
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
