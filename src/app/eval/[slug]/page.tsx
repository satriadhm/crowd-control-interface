"use client";

import { SUBMIT_ANSWER } from "@/app/graphql/mutations/tasks";
import { GET_TASK_BY_ID } from "@/app/graphql/queries/tasks";
import { Task } from "@/app/graphql/types/tasks";
import { useTaskDetail } from "@/utils/common";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PageDetail() {
  const taskId = useTaskDetail((state) => state.id);
  const searchParams = useSearchParams();
  const getCreds = searchParams.get("creds");
  const [myAnswer, setMyAnswer] = useState<string>("");
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

      router.push(`/eval?creds=${getCreds}`);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="mt-5">
        {taskDetailData ? (
          <div className="">
            <p>{taskDetailData?.getTaskById.question}</p>

            <div className="flex flex-wrap gap-4 items-center justify-center mt-12">
              {taskDetailData.getTaskById.answers?.map((item, index) => (
                <button
                  onClick={() => setMyAnswer(item.answer)}
                  className={`border ${
                    myAnswer.includes(item.answer) ? "bg-cyan-500/25" : ""
                  } border-cyan-500 px-8 py-2 hover:bg-cyan-500/25 rounded-lg`}
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
