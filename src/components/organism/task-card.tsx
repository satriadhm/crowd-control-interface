import { useTaskDetail } from "@/utils/common";
import Link from "next/link";

export default function TaskCard({ task }) {
  const setId = useTaskDetail((state) => state.setId);

  return (
    <Link
      href={`/eval/${task.id}`}
      onClick={() => setId(task.id)}
      className="bg-white/10 p-4 rounded-lg shadow-md hover:shadow-lg transition hover:bg-white/20"
    >
      <h2 className="text-xl font-semibold mb-2 text-white">{task.title}</h2>
      {task.description && (
        <p className="text-gray-300 mb-4">{task.description}</p>
      )}
      <div className="text-sm text-gray-400">
        <p>
          <strong>Scenario:</strong>{" "}
          {task.question?.scenario || "No scenario available"}
        </p>
        <p>
          <strong>Given:</strong> {task.question?.given || "-"}
        </p>
        <p>
          <strong>When:</strong> {task.question?.when || "-"}
        </p>
        <p>
          <strong>Then:</strong> {task.question?.then || "-"}
        </p>
      </div>
    </Link>
  );
}
