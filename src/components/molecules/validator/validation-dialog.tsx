// src/components/molecules/validation-dialog.tsx
"use client";

import { useMutation } from "@apollo/client";
import { VALIDATE_TASK } from "@/graphql/mutations/tasks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Task } from "@/graphql/types/tasks";

interface ValidationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTaskId: string | null;
  taskDetail: Task | null;
  loadingTaskDetail: boolean;
  onValidationComplete: () => void;
}

export default function ValidationDialog({
  isOpen,
  onOpenChange,
  selectedTaskId,
  taskDetail,
  loadingTaskDetail,
  onValidationComplete,
}: ValidationDialogProps) {
  const [validateQuestionTask] = useMutation(VALIDATE_TASK);

  // Lakukan validasi
  const handleValidation = async (id: string) => {
    try {
      await validateQuestionTask({
        variables: { id },
      });
      alert("Task updated successfully!");
      onValidationComplete();
      onOpenChange(false);
    } catch (err: unknown) {
      alert(
        "Error updating task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Validation
          </DialogTitle>
        </DialogHeader>
        {loadingTaskDetail ? (
          <p>Loading task details...</p>
        ) : taskDetail ? (
          <div className="space-y-4">
            {/* Tampilan interaktif untuk scenario */}
            <div className="p-4 border rounded bg-gray-100">
              <p className="mb-2 font-semibold">Scenario:</p>
              <p>{taskDetail.question.scenario}</p>
            </div>
            {taskDetail.description && (
              <div className="p-4 border rounded bg-gray-100">
                <p className="mb-2 font-semibold">Description:</p>
                <p>{taskDetail.description}</p>
              </div>
            )}
            <div className="p-4 border rounded bg-gray-100">
              <p className="mb-2 font-semibold">Answers:</p>
              <div className="space-y-2 ml-4">
                {taskDetail.answers.map((answerObj, index) => (
                  <p key={index}>
                    {answerObj.answer}{" "}
                    {answerObj.stats && `(${answerObj.stats})`}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => handleValidation(taskDetail.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                Validate
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-gray-600 hover:bg-gray-700"
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
                onClick={() => handleValidation(selectedTaskId || "")}
                className="bg-green-600 hover:bg-green-700"
              >
                Validate
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
