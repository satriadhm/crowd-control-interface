"use client";

import { useTaskDetail } from "@/utils/common";
import { useRouter, useSearchParams } from "next/navigation";

export default function TaskCard({ task }) {
  const setId = useTaskDetail((state) => state.setId);
  const searchParams = useSearchParams();
  const getCreds = searchParams.get("creds") ?? "";
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/eval/${task.id}?creds=${getCreds}`);
        setId(task.id);
      }}
      className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-sm text-gray-500">Question: {task.question}</p>
    </button>
  );
}
