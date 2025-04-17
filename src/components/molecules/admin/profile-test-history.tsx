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
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function ProfileTestHistory() {
  const { accessToken } = useAuthStore();
  const [initialized, setInitialized] = useState(false);
  const [workerId, setWorkerId] = useState<string | null>(null);

  // Get the workerId from JWT on the client side
  useEffect(() => {
    setInitialized(true);

    if (accessToken) {
      try {
        // Simple JWT parsing to get the payload
        const base64Url = accessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const payload = JSON.parse(jsonPayload);
        if (payload.id) {
          setWorkerId(payload.id);
        }
      } catch (error) {
        console.error("Error parsing JWT:", error);
      }
    }
  }, [accessToken]);

  const {
    data: historyData,
    loading,
    error,
  } = useQuery(GET_ELIGIBILITY_HISTORY, {
    variables: { workerId },
    skip: !workerId || !initialized,
  });

  if (!initialized || !workerId) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test History</h2>
        <p className="text-gray-300">Initializing test history...</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test History</h2>
        <p className="text-gray-300">Loading test history...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test History</h2>
        <p className="text-red-400">
          Error loading test history: {error.message}
        </p>
      </section>
    );
  }

  const testHistory = historyData?.getTestHistory || [];

  return (
    <>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test History</h2>
        {testHistory.length === 0 ? (
          <p className="text-gray-300">No test history available.</p>
        ) : (
          <div className="overflow-x-auto">
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
          </div>
        )}
      </section>

      {testHistory.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Score Trend</h2>
          <div className="bg-white/5 p-4 rounded-lg">
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
          </div>
        </section>
      )}
    </>
  );
}
