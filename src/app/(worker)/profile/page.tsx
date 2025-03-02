"use client";

import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { GET_TEST_HISTORY } from "@/graphql/queries/testHistory"; // query baru untuk riwayat test
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_LOGGED_IN_USER);
  const { data: historyData, loading: historyLoading, error: historyError } = useQuery(GET_TEST_HISTORY);

  if (userLoading || historyLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError.message}</p>;
  if (historyError) return <p>Error: {historyError.message}</p>;

  const testHistory = historyData?.getTestHistory || [];

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Profile & Test History</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p>Name: {userData.me.firstName} {userData.me.lastName}</p>
          <p>Email: {userData.me.email}</p>
          {/* Tambahkan info lain bila perlu */}
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Test History</h2>
          {testHistory.length === 0 ? (
            <p>No test history available.</p>
          ) : (
            <table className="min-w-full bg-white bg-opacity-10 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Test ID</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test: any) => (
                  <tr key={test.id}>
                    <td className="border px-4 py-2">{test.id}</td>
                    <td className="border px-4 py-2">{test.score}</td>
                    <td className="border px-4 py-2">{test.date}</td>
                    <td className="border px-4 py-2">{test.feedback || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            <p>No trend data available.</p>
          )}
        </section>
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </main>
    </div>
  );
}
