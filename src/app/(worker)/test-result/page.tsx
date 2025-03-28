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
            className={`flex items-center justify-center p-6 rounded-lg border-2 ${
              me.isEligible
                ? "bg-gradient-to-r from-purple-300 to-purple-500 text-white border-purple-600"
                : "bg-gradient-to-r from-pink-300 to-pink-500 text-white border-pink-600"
            } shadow-lg bg-[length:100%_100%] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22%3E%3Cpath fill=%22%23ffffff%22 d=%22M0 0h5v5H0zm5 5h5v5H5z%22/%3E%3C/svg%3E')]`}
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
