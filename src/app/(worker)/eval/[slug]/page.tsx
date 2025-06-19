"use client";

import TaskEvaluation from "@/components/molecules/worker/task-evaluation";
import { useTaskDetail } from "@/utils/common";

export default function PageDetail() {
  const taskId = useTaskDetail((state) => state.id);

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-6 px-4 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <TaskEvaluation taskId={taskId} />
    </div>
  );
}
