"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_ALL_USERS } from "@/graphql/queries/users";
import AdminSidebar from "@/components/molecules/admin-sidebar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function AdminTestResults() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  // Fetch all users data
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  if (loading)
    return <p className="text-center text-gray-200">Loading user data...</p>;
  if (error)
    return <p className="text-center text-red-300">Error: {error.message}</p>;

  // Process the data to format it for the charts
  const users = data?.getAllUsers || [];

  // Create a dataset for eligibility statistics based on user role
  // Normally this would come from real eligibility data, but for this example we'll simulate it
  const eligibleUsers = users.filter((user) => user.isEligible == true).length;
  const nonEligibleUsers = users.filter(
    (user) => user.isEligible != true
  ).length;

  // Create eligibility pie chart data
  const eligibilityData = [
    { name: "Eligible", value: eligibleUsers },
    { name: "Not Eligible", value: nonEligibleUsers },
  ];

  // Color for pie chart
  const COLORS = ["#48BB78", "#FC8181"];

  // Create performance metrics data - simulating algorithm performance over time
  // In a real scenario, this data would come from backend calculations
  const algorithmPerformanceData = [
    { month: "Jan", accuracyRate: 0.92, responseTime: 250 },
    { month: "Feb", accuracyRate: 0.88, responseTime: 275 },
    { month: "Mar", accuracyRate: 0.91, responseTime: 260 },
    { month: "Apr", accuracyRate: 0.93, responseTime: 240 },
    { month: "May", accuracyRate: 0.94, responseTime: 230 },
    { month: "Jun", accuracyRate: 0.95, responseTime: 220 },
  ];

  // Create user performance data to show a comparison between users
  const userPerformanceData = users
    .filter((user) => user.role === "worker")
    .slice(0, 8) // Limit to 8 users for readability
    .map((user) => ({
      name: `${user.firstName} ${user.lastName.charAt(0)}.`,
      accuracy: Math.random() * 0.3 + 0.7, // Simulated accuracy between 70% and 100%
      taskCompletion: Math.floor(Math.random() * 30) + 10, // Simulated task completion count
    }));

  return (
    <div className="grid grid-cols-12">
      <AdminSidebar />
      <main className="col-span-10 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Test Results & Algorithm Performance
            </h1>
            <Button onClick={() => router.push("/task-management")}>
              Back to Task Management
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Eligibility Chart */}
            <div className="bg-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                User Eligibility Status
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eligibilityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {eligibilityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Algorithm Accuracy Rate */}
            <div className="bg-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Algorithm Accuracy Rate (Over Time)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={algorithmPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                  <XAxis dataKey="month" stroke="#CBD5E0" />
                  <YAxis
                    stroke="#CBD5E0"
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    domain={[0.85, 1]}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${(Number(value) * 100).toFixed(1)}%`,
                      "Accuracy Rate",
                    ]}
                    contentStyle={{
                      backgroundColor: "#2D3748",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracyRate"
                    stroke="#48BB78"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Algorithm Response Time */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Algorithm Response Time (ms)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={algorithmPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="month" stroke="#CBD5E0" />
                <YAxis stroke="#CBD5E0" domain={[200, 300]} />
                <Tooltip
                  formatter={(value) => [`${value} ms`, "Response Time"]}
                  contentStyle={{
                    backgroundColor: "#2D3748",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#4299E1"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Performance Comparison */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              User Performance Comparison
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={userPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#CBD5E0" />
                <YAxis
                  yAxisId="left"
                  stroke="#CBD5E0"
                  domain={[0.7, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#CBD5E0" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "accuracy")
                      return [`${(Number(value) * 100).toFixed(1)}%`, "Accuracy"];
                    return [value, "Tasks Completed"];
                  }}
                  contentStyle={{
                    backgroundColor: "#2D3748",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="accuracy"
                  fill="#48BB78"
                  name="Accuracy"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="taskCompletion"
                  fill="#4299E1"
                  name="Tasks Completed"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
