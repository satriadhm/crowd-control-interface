"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SingleTaskProps {
  taskId: string;
  answer: string;
}

export default function SingleTaskQuestion({ taskId, answer }: SingleTaskProps) {
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id: taskId },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="bg-white/10 p-4 rounded-lg">
        <p>Loading task...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white/10 p-4 rounded-lg">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const taskData = data?.getTaskById;

  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium mb-2">Task</h3>
          {taskData?.question ? (
            <div className="text-sm">
              <p><strong>Scenario:</strong> {taskData.question.scenario}</p>
            </div>
          ) : (
            <p>No question available</p>
          )}
          <p className="text-sm opacity-75 mt-2">Your Answer: {answer}</p>
        </div>
        <Button onClick={() => setOpenModal(true)} size="sm">
          View Task
        </Button>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Detail</DialogTitle>
          </DialogHeader>
          {taskData ? (
            <div className="space-y-2">
              {taskData.question && (
                <>
                  <p>
                    <strong>Scenario:</strong> {taskData.question.scenario}
                  </p>
                  <p>
                    <strong>Given:</strong> {taskData.question.given}
                  </p>
                  <p>
                    <strong>When:</strong> {taskData.question.when}
                  </p>
                  <p>
                    <strong>Then:</strong> {taskData.question.then}
                  </p>
                </>
              )}
              {taskData.description && (
                <p>
                  <strong>Description:</strong> {taskData.description}
                </p>
              )}
              {taskData.answers?.length > 0 && (
                <div>
                  <strong>Answers:</strong>
                  <ul className="list-disc list-inside">
                    {taskData.answers.map((ans: { answer: string; stats?: string }, idx: number) => (
                      <li key={idx}>
                        {ans.answer} {ans.stats && `(stats: ${ans.stats})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p>
                <strong>Your Answer:</strong> {answer}
              </p>
            </div>
          ) : (
            <p>Task not found</p>
          )}
          <DialogFooter>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}