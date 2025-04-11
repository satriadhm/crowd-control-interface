"use client";

import { SUBMIT_ANSWER } from "@/graphql/mutations/m1";
import { GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { Task } from "@/graphql/types/tasks";
import { useTaskDetail } from "@/utils/common";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PageDetail() {
  const taskId = useTaskDetail((state) => state.id);
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds
  const router = useRouter();

  const [submitAnswer] = useMutation(SUBMIT_ANSWER);

  const [getTaskById, { data: taskDetailData, loading, error }] = useLazyQuery<{
    getTaskById: Task;
  }>(GET_TASK_BY_ID);

  useEffect(() => {
    if (taskId) {
      getTaskById({ variables: { id: taskId } });
    }
  }, [taskId, getTaskById]);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time's up!");
      router.push("/eval");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSubmitAnswer = async () => {
    if (selectedAnswerId === null) {
      alert("Please select an answer");
      return;
    }

    try {
      await submitAnswer({
        variables: {
          input: {
            taskId: taskId,
            answer: myAnswer,
            answerId: selectedAnswerId,
          },
        },
      });
      alert("Answer submitted successfully!");
      router.push(`/eval`);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <div className="max-w-3xl w-full p-6">
        {taskDetailData ? (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            {/* Timer Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>

            {/* Gherkin Layout */}
            <div className="mb-6 space-y-4">
              <div>
                <span className="font-bold">Scenario:</span>{" "}
                <span>{taskDetailData.getTaskById.question?.scenario}</span>
              </div>
              <div>
                <span className="font-bold">Given:</span>{" "}
                <span>{taskDetailData.getTaskById.question?.given}</span>
              </div>
              <div>
                <span className="font-bold">When:</span>{" "}
                <span>{taskDetailData.getTaskById.question?.when}</span>
              </div>
              <div>
                <span className="font-bold">Then:</span>{" "}
                <span>{taskDetailData.getTaskById.question?.then}</span>
              </div>
            </div>

            {/* Answers Section */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
              {taskDetailData.getTaskById.answers?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMyAnswer(item.answer);
                    setSelectedAnswerId(item.answerId || index);
                  }}
                  className={`border border-cyan-500 px-8 py-2 rounded-lg hover:bg-cyan-500/25 ${
                    myAnswer === item.answer ? "bg-cyan-500/25" : ""
                  }`}
                >
                  {item.answer}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSubmitAnswer}
                disabled={!myAnswer}
                className="mt-4 bg-green-500 disabled:bg-gray-300 text-white rounded-lg px-8 py-2"
              >
                Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <p>No task found</p>
        )}
      </div>
    </div>
  );
}
