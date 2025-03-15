"use client";

import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { GET_TASK_HISTORY } from "@/graphql/queries/m1";

export default function TestResultsPage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_TASK_HISTORY, { fetchPolicy: "network-only" });

  if (loading) return <p>Loading test results...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const testHistory = data?.getTestHistory || [];
  const averageScore =
    testHistory.reduce((acc: number, curr: { score: number }) => acc + curr.score, 0) / (testHistory.length || 1);
  let feedback = "";
  if (averageScore >= 90) feedback = "Excellent performance!";
  else if (averageScore >= 75) feedback = "Good performance, but room for improvement.";
  else feedback = "Needs improvement. Consider reviewing the test materials.";

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Detailed Test Results</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Overall Performance</h2>
          <p>Average Score: {averageScore.toFixed(2)}</p>
          <p>Feedback: {feedback}</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Score Trend</h2>
          {testHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={testHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="date" stroke="#CBD5E0" />
                <YAxis stroke="#CBD5E0" />
                <Tooltip contentStyle={{ backgroundColor: "#2D3748", border: "none", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#48BB78" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No test history data available.</p>
          )}
        </section>
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </main>
    </div>
  );
}
