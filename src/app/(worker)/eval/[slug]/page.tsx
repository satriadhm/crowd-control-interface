// src/app/(worker)/eval/[slug]/page.tsx
"use client";

import { SUBMIT_ANSWER } from "@/graphql/mutations/tasks";
import { GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { Task } from "@/graphql/types/tasks";
import { useTaskDetail } from "@/utils/common";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PageDetail() {
  const taskId = useTaskDetail((state) => state.id);
  const [myAnswer, setMyAnswer] = useState<string>("");
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
    try {
      await submitAnswer({
        variables: {
          answer: myAnswer,
          taskId: taskId,
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
      <div className="mt-5">
        {taskDetailData ? (
          <div className="">
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-white">{taskDetailData?.getTaskById.question}</p>

            <div className="flex flex-wrap gap-4 items-center justify-center mt-12">
              {taskDetailData.getTaskById.answers?.map((item, index) => (
                <button
                  onClick={() => setMyAnswer(item.answer)}
                  className={`border ${
                    myAnswer.includes(item.answer) ? "bg-cyan-500/25" : ""
                  } border-cyan-500 px-8 py-2 hover:bg-cyan-500/25 rounded-lg text-white`}
                  key={index}
                >
                  {item.answer}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSubmitAnswer}
                disabled={!myAnswer}
                className="mt-24 bg-green-500 disabled:bg-gray-300 text-white rounded-lg px-8 py-2"
              >
                Submit Jawaban
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