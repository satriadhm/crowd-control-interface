"use client";

import React, { useState } from "react";
import TaskCard from "../components/eval/TaskCard";

const mockTasks = [
  {
    id: "1",
    title: "Task 1",
    description: "This is the first task",
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
  },
  {
    id: "2",
    title: "Task 2",
    description: "This is the second task",
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
  },
];

export default function EvalPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectAnswer = (taskId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", selectedAnswers);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Evaluation</h1>
      {mockTasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          question={task.question}
          answers={task.answers}
          onSelectAnswer={handleSelectAnswer}
        />
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-secondary"
      >
        Submit
      </button>
    </div>
  );
}
