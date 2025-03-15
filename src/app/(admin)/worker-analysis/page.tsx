"use client";

import { useQuery } from "@apollo/client";
import Sidebar from "@/components/molecules/admin-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { GET_WORKER_ANALYSIS } from "@/graphql/queries/m1";

export default function TesterAnalysisDashboard() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_WORKER_ANALYSIS, { fetchPolicy: "network-only" });

  if (loading) return <p>Loading tester analysis...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const analysisData = data?.getTesterAnalysis || [];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Tester Analysis Dashboard</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tester Accuracy (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="testerName" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" />
              <Tooltip contentStyle={{ backgroundColor: "#2D3748", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="accuracy" fill="#48BB78" />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Accuracy Trend (Line Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="testerName" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" />
              <Tooltip contentStyle={{ backgroundColor: "#2D3748", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#4299E1" />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <Button onClick={() => router.push("/task-management")}>Back to Task Management</Button>
      </main>
    </div>
  );
}

