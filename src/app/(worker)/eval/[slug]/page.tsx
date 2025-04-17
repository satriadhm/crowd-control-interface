"use client";

import TaskEvaluation from "@/components/molecules/worker/task-evaluation";
import { useTaskDetail } from "@/utils/common";

export default function PageDetail() {
  const taskId = useTaskDetail((state) => state.id);

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <TaskEvaluation taskId={taskId} />
    </div>
  );
}
