import { Task } from "@/graphql/types/tasks";
import { useTaskDetail } from "@/utils/common";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
  completed?: boolean;
  answer?: string;
}

export default function TaskCard({ task, completed, answer }: TaskCardProps) {
  const setId = useTaskDetail((state) => state.setId);

  const cardContent = (
    <div
      className={`relative p-12 rounded-lg shadow-md transition ${
        completed
          ? "bg-blue-100 border border-blue-300" // updated completed styling
          : "bg-white/10 hover:shadow-lg hover:bg-white/20"
      }`}
    >
      {completed && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Completed
        </div>
      )}
      <h2
        className={`text-xl font-semibold mb-2 ${
          completed ? "text-gray-800" : "text-white"
        }`}
      >
        {task.title}
      </h2>
      {task.description && (
        <p className={`${completed ? "text-gray-700" : "text-gray-300"} mb-4`}>
          {task.description}
        </p>
      )}
      <div className={`text-sm ${completed ? "text-gray-800" : "text-gray-400"}`}>
        <p>
          <strong>Scenario:</strong>{" "}
          {task.question?.scenario || "No scenario available"}
        </p>
      </div>
      {completed && answer && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-blue-800">
            <strong>Answer:</strong> {answer}
          </p>
        </div>
      )}
    </div>
  );

  // If the task is completed, return the card without Link
  if (completed) {
    return cardContent;
  }

  return (
    <Link
      href={`/eval/${task.id}`}
      onClick={() => setId(task.id)}
      className="cursor-pointer"
    >
      {cardContent}
    </Link>
  );
}