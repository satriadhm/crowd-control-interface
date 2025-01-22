import React from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  question: string;
  answers: string[]; // List of multiple-choice answers
  onSelectAnswer: (taskId: string, answer: string) => void; // Callback function
};

export default function TaskCard({
  id,
  title,
  description,
  question,
  answers,
  onSelectAnswer,
}: Task) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <p className="font-medium text-gray-800 mb-3">{question}</p>
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name={`task-${id}`}
              value={answer}
              onChange={() => onSelectAnswer(id, answer)}
              className="h-4 w-4 text-secondary focus:ring-primary"
            />
            <span className="text-gray-700">{answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
