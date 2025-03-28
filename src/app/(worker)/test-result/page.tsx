"use client";

import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { useAuthStore } from "@/store/authStore";
import SingleTaskQuestion from "@/components/organism/task-result";

interface Task {
  taskId: string;
  answer: string;
}

export default function TestResultsPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  // Ambil data user
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  const me = userData?.me;
  if (!me) return <p>User data not available</p>;

  const completedTasks = me.completedTasks || [];

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Test Results</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Eligibility Status</h2>
          <div
            className={`flex items-center justify-center p-6 rounded-lg ${
              me.isEligible
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                : "bg-gradient-to-r from-red-400 to-red-500 text-white"
            } shadow-lg`}
          >
            <p className="text-2xl font-bold">
              {me.isEligible ? "Eligible" : "Not Eligible"}
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">Completed Tests</h2>
          {completedTasks.length === 0 ? (
            <p>No completed tests yet</p>
          ) : (
            <div className="grid gap-4">
              {completedTasks.map((task: Task, index: number) => (
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
      </main>
    </div>
  );
}
