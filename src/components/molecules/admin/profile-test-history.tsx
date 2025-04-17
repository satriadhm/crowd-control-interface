// src/components/molecules/profile-test-history.tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_ELIGIBILITY_HISTORY } from "@/graphql/queries/mx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function ProfileTestHistory() {
  const {
    data: historyData,
    loading,
    error,
  } = useQuery(GET_ELIGIBILITY_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const testHistory = historyData?.getTestHistory || [];

  return (
    <>
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
              {testHistory.map(
                (test: {
                  id: string;
                  score: number;
                  date: string;
                  feedback?: string;
                }) => (
                  <tr key={test.id}>
                    <td className="border px-4 py-2">{test.id}</td>
                    <td className="border px-4 py-2">{test.score}</td>
                    <td className="border px-4 py-2">{test.date}</td>
                    <td className="border px-4 py-2">
                      {test.feedback || "N/A"}
                    </td>
                  </tr>
                )
              )}
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2D3748",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#48BB78"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No trend data available.</p>
        )}
      </section>
    </>
  );
}
    