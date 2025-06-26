// src/components/molecules/worker/task-evaluation.tsx

"use client";

import { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SUBMIT_ANSWER } from "@/graphql/mutations/mx";
import { GET_TASK_BY_ID, GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { TRIGGER_ELIGIBILITY_UPDATE } from "@/graphql/mutations/mx";
import { Task } from "@/graphql/types/tasks";
import { useAuthStore } from "@/store/authStore";

interface TaskEvaluationProps {
  taskId: string;
}

export default function TaskEvaluation({ taskId }: TaskEvaluationProps) {
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const router = useRouter();
  const client = useApolloClient();
  const { accessToken } = useAuthStore();

  const [submitAnswer] = useMutation(SUBMIT_ANSWER);
  const [triggerEligibilityUpdate] = useMutation(TRIGGER_ELIGIBILITY_UPDATE);
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
      alert("Time's up! Redirecting to task list.");
      router.push("/eval");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const checkTaskCompletion = async () => {
    try {
      // Get updated user data
      const userResponse = await client.query({
        query: GET_LOGGED_IN_USER,
        variables: { token: accessToken },
        fetchPolicy: "no-cache",
      });

      // Get total tasks
      const totalTasksResponse = await client.query({
        query: GET_TOTAL_TASKS,
        fetchPolicy: "no-cache",
      });

      const completedTasksCount =
        userResponse.data.me.completedTasks?.length || 0;
      const totalTasks = totalTasksResponse.data.getTotalTasks || 0;

      return { completedTasksCount, totalTasks };
    } catch (error) {
      console.error("Error checking task completion:", error);
      return { completedTasksCount: 0, totalTasks: 0 };
    }
  };

  const onSubmitAnswer = async () => {
    if (selectedAnswerId === null) {
      alert("Please select an answer");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("Submitting your answer...");

    try {
      // Submit the answer
      await submitAnswer({
        variables: {
          input: {
            taskId: taskId,
            answer: myAnswer,
            answerId: selectedAnswerId,
          },
        },
      });

      setSubmissionStatus("Answer submitted! Checking completion status...");

      // Check if this was the last task for the user
      const { completedTasksCount, totalTasks } = await checkTaskCompletion();

      if (completedTasksCount >= totalTasks) {
        setSubmissionStatus("🎉 Congratulations! You've completed all tasks!");

        // Show detailed completion message
        setTimeout(() => {
          alert(
            `🎉 Amazing! You've completed all ${totalTasks} tasks!\n\n` +
              `Your eligibility is now being calculated using the M-X algorithm. ` +
              `This process may take a few minutes as we need at least 3 workers to complete all tasks ` +
              `before we can run the eligibility calculation.\n\n` +
              `You can check your status in the dashboard or test results page.`
          );
        }, 1000);

        // Try to trigger eligibility update (this might be pending if < 3 workers completed)
        try {
          setSubmissionStatus("Triggering eligibility calculation...");
          await triggerEligibilityUpdate({
            context: {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          });
          setSubmissionStatus(
            "Eligibility calculation triggered successfully!"
          );
        } catch (error) {
          console.log("Eligibility update trigger info:", error);
          setSubmissionStatus(
            "Answer recorded - eligibility calculation will run when criteria are met."
          );
        }
      } else {
        const remaining = totalTasks - completedTasksCount;
        setSubmissionStatus(
          `Answer submitted! ${remaining} task${
            remaining > 1 ? "s" : ""
          } remaining.`
        );

        setTimeout(() => {
          alert(
            `Answer submitted successfully!\n\n` +
              `Progress: ${completedTasksCount}/${totalTasks} tasks completed\n` +
              `You have ${remaining} task${remaining > 1 ? "s" : ""} remaining.`
          );
        }, 1000);
      }

      // Redirect after a delay to show the status message
      setTimeout(() => {
        router.push("/eval");
      }, 3000);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setSubmissionStatus("Error submitting answer. Please try again.");
      alert("Error submitting answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTasks = () => {
    if (
      window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      )
    ) {
      router.push("/eval");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl w-full p-6">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl w-full p-6">
        <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-300 mb-4">Error: {error.message}</p>
          <button
            onClick={handleBackToTasks}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full p-6">
      {taskDetailData ? (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          {/* Back button */}
          <div className="mb-4">
            <button
              onClick={handleBackToTasks}
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Tasks
            </button>
          </div>

          {/* Timer */}
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
            <div
              className={`h-2.5 rounded-full transition-all duration-1000 ${
                timeLeft > 30
                  ? "bg-green-500"
                  : timeLeft > 10
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            ></div>
          </div>

          <div className="text-center mb-4">
            <span
              className={`text-lg font-bold ${
                timeLeft > 30
                  ? "text-green-400"
                  : timeLeft > 10
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              Time remaining: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Submission Status */}
          {submissionStatus && (
            <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 text-center">
                <span className="font-semibold">Status:</span>{" "}
                {submissionStatus}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {taskDetailData.getTaskById.title}
            </h2>
            {taskDetailData.getTaskById.description && (
              <p className="text-gray-300">
                {taskDetailData.getTaskById.description}
              </p>
            )}
          </div>

          <div className="mb-6 space-y-4 bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-bold text-blue-400">Scenario:</span>{" "}
              <span className="text-gray-300">
                {taskDetailData.getTaskById.question?.scenario}
              </span>
            </div>
            <div>
              <span className="font-bold text-green-400">Given:</span>{" "}
              <span className="text-gray-300">
                {taskDetailData.getTaskById.question?.given}
              </span>
            </div>
            <div>
              <span className="font-bold text-yellow-400">When:</span>{" "}
              <span className="text-gray-300">
                {taskDetailData.getTaskById.question?.when}
              </span>
            </div>
            <div>
              <span className="font-bold text-purple-400">Then:</span>{" "}
              <span className="text-gray-300">
                {taskDetailData.getTaskById.question?.then}
              </span>
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Select your answer:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taskDetailData.getTaskById.answers?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMyAnswer(item.answer);
                    setSelectedAnswerId(item.answerId || index);
                  }}
                  className={`border-2 px-6 py-4 rounded-lg transition-all duration-200 text-left ${
                    myAnswer === item.answer
                      ? "border-cyan-500 bg-cyan-500/25 text-white"
                      : "border-gray-600 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-gray-300 hover:text-white"
                  }`}
                  disabled={isSubmitting}
                >
                  <div className="font-medium">{item.answer}</div>
                  {item.stats && (
                    <div className="text-sm text-gray-400 mt-1">
                      {item.stats}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected answer display */}
          {myAnswer && (
            <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <p className="text-blue-300">
                <span className="font-semibold">Selected answer:</span>{" "}
                {myAnswer}
              </p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              onClick={onSubmitAnswer}
              disabled={!myAnswer || isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                !myAnswer || isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                      className="opacity-75"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Answer"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <p className="text-gray-300 mb-4">No task found</p>
          <button
            onClick={handleBackToTasks}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Tasks
          </button>
        </div>
      )}
    </div>
  );
}
