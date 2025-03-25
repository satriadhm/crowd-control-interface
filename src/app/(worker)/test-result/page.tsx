"use client";

import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { useAuthStore } from "@/store/authStore";

export default function TestResultsPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Test Results</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Eligibility Status</h2>
          <p
            className={
              userData.me.isEligible ? "text-green-400" : "text-red-400"
            }
          >
            {userData.me.isEligible ? "Eligible" : "Not Eligible"}
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">Completed Tests</h2>
          {userData.me.completedTasks.length === 0 ? (
            <p>No completed tests yet</p>
          ) : (
            <div className="grid gap-4">
              {userData.me.completedTasks.map((task, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Task ID: {task.taskId}</h3>
                      <p className="text-sm opacity-75">
                        Your answer: {task.answer}
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push(`/eval/${task.taskId}`)}
                      size="sm"
                    >
                      View Task
                    </Button>
                  </div>
                </div>
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
