"use client";

import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { useAuthStore } from "@/store/authStore";
import SingleTaskQuestion from "@/components/organism/task-result";
import { AnsweredTask } from "@/graphql/types/tasks";
import { Suspense, useEffect, useState } from "react";

export default function TestResultsPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  // Only run the query on the client side after initial mount
  useEffect(() => {
    setInitialized(true);
  }, []);

  // Fetch user data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken || !initialized,
    fetchPolicy: "network-only",
  });

  // Render function that handles all states safely
  const renderContent = () => {
    if (!initialized) {
      return <p className="text-center text-gray-300">Initializing...</p>;
    }

    if (userLoading) {
      return <p className="text-center text-gray-300">Loading user data...</p>;
    }

    if (userError) {
      return (
        <div className="text-center text-red-400">
          <p>Error loading user data: {userError.message}</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      );
    }

    // Make sure userData and userData.me exist before using them
    if (!userData || !userData.me) {
      return (
        <div className="text-center text-amber-400">
          <p>User data not available. Please try logging in again.</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Go to Login
          </Button>
        </div>
      );
    }

    const me = userData.me;
    const completedTasks = me.completedTasks || [];

    // Determine card style and text based on isEligible value
    const getEligibilityStyle = () => {
      // Handle the three possible states more clearly
      if (me.isEligible === true) {
        return {
          cardClass:
            "bg-gradient-to-r from-purple-300 to-purple-500 text-white border-purple-600",
          text: "Eligible",
        };
      } else if (me.isEligible === false) {
        return {
          cardClass:
            "bg-gradient-to-r from-pink-300 to-pink-500 text-white border-pink-600",
          text: "Not Eligible",
        };
      } else {
        // Handle null/undefined case - pending evaluation
        return {
          cardClass:
            "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white border-yellow-600",
          text: "Pending Evaluation",
        };
      }
    };

    const eligibilityStyle = getEligibilityStyle();

    // If we have valid user data, render the test results
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Test Results</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Eligibility Status</h2>
          <div
            className={`flex items-center justify-center p-6 rounded-lg border-2 ${eligibilityStyle.cardClass} shadow-lg bg-[length:100%_100%] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22%3E%3Cpath fill=%22%23ffffff%22 d=%22M0 0h5v5H0zm5 5h5v5H5z%22/%3E%3C/svg%3E')]`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold">{eligibilityStyle.text}</p>
              {me.isEligible === null && (
                <p className="text-sm mt-2 max-w-md">
                  Your eligibility is being evaluated based on your test
                  performance. Continue completing tasks to receive a full
                  evaluation.
                </p>
              )}
              {me.isEligible === false && (
                <p className="text-sm mt-2 max-w-md">
                  Based on your test performance, you&#39;re currently not
                  eligible. Keep taking tests to improve your status!
                </p>
              )}
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p>No completed tests yet</p>
          ) : (
            <div className="max-h-96 overflow-y-auto grid gap-4">
              {completedTasks.map((task: AnsweredTask, index: number) => (
                <SingleTaskQuestion
                  key={index}
                  taskId={task.taskId}
                  answer={task.answer}
                />
              ))}
            </div>
          )}
        </section>

        <Button onClick={() => router.push("/dashboard")} className="mt-6">
          Back to Dashboard
        </Button>
      </>
    );
  };

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <Suspense
          fallback={<p className="text-center text-gray-300">Loading...</p>}
        >
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
}
