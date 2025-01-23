"use client";

export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-sm text-gray-500">Question: {task.question}</p>
    </div>
  );
}
