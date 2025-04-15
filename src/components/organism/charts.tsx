"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuthStore } from "@/store/authStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { GET_DASHBOARD_SUMMARY } from "@/graphql/mutations/m1";

// Default colors for pie charts
const COLORS = ["#48BB78", "#FC8181", "#4299E1", "#F6AD55"];

export default function DashboardCharts() {
  const [activeChart, setActiveChart] = useState("iterationMetrics");
  const { accessToken } = useAuthStore();

  // Fetch data from the new API endpoint
  const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Loading state
  if (loading) {
    return (
      <div className="bg-white/10 p-6 rounded-lg shadow-md flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          Platform Analytics
        </h2>
        <div className="bg-red-500/20 text-red-300 p-4 rounded">
          <p>Error loading dashboard data: {error.message}</p>
          <p className="text-sm mt-2">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  // Default fallback data if API returns nothing
  const dashboardData = data?.getDashboardSummary || {
    iterationMetrics: [
      { iteration: "Iteration 1", workers: 35, tasks: 124 },
      { iteration: "Iteration 2", workers: 42, tasks: 180 },
      { iteration: "Iteration 3", workers: 48, tasks: 210 },
      { iteration: "Iteration 4", workers: 55, tasks: 250 },
      { iteration: "Iteration 5", workers: 62, tasks: 290 },
      { iteration: "Iteration 6", workers: 70, tasks: 320 },
    ],
    workerEligibility: [
      { name: "Eligible", value: 70 },
      { name: "Not Eligible", value: 30 },
    ],
    taskValidation: [
      { name: "Validated", value: 65 },
      { name: "Not Validated", value: 35 },
    ],
    accuracyDistribution: [
      { name: "90-100%", value: 35 },
      { name: "80-89%", value: 42 },
      { name: "70-79%", value: 18 },
      { name: "Below 70%", value: 5 },
    ],
  };

  // Get current active iteration
  // Look for the first iteration with non-zero workers, or use the first iteration if all are zero
  const currentIterationIndex = dashboardData.iterationMetrics.findIndex(
    (metric) => metric.workers > 0
  );
  const currentIteration =
    currentIterationIndex >= 0 ? currentIterationIndex + 1 : 1;

  // Modify iteration metrics for display - zero out worker counts for future iterations
  // (iterations after the current active one)
  const modifiedIterationMetrics = dashboardData.iterationMetrics.map(
    (metric, index) => {
      // If this iteration is after the current active one, set workers to 0
      if (index + 1 > currentIteration) {
        return {
          ...metric,
          workers: 0, // Future iterations have 0 workers until they become active
        };
      }
      return metric;
    }
  );

  const { workerEligibility, taskValidation, accuracyDistribution } =
    dashboardData;

  // Calculate summary values for the small charts
  const eligibleCount =
    workerEligibility.find((item) => item.name === "Eligible")?.value || 0;
  const nonEligibleCount =
    workerEligibility.find((item) => item.name === "Not Eligible")?.value || 0;

  const validatedCount =
    taskValidation.find((item) => item.name === "Validated")?.value || 0;
  const nonValidatedCount =
    taskValidation.find((item) => item.name === "Not Validated")?.value || 0;

  return (
    <div className="space-y-6">
      {/* Main Chart Area */}
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Platform Analytics
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveChart("iterationMetrics")}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === "iterationMetrics"
                  ? "bg-tertiary text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Iteration Metrics
            </button>
            <button
              onClick={() => setActiveChart("eligibilityComparison")}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === "eligibilityComparison"
                  ? "bg-tertiary text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Worker Status
            </button>
            <button
              onClick={() => setActiveChart("taskValidation")}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === "taskValidation"
                  ? "bg-tertiary text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Task Status
            </button>
            <button
              onClick={() => setActiveChart("accuracyDistribution")}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === "accuracyDistribution"
                  ? "bg-tertiary text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Accuracy Distribution
            </button>
          </div>
        </div>

        {activeChart === "iterationMetrics" && (
          <>
            <p className="text-sm text-gray-300 mb-4">
              Number of workers and tasks across iterations (Current: Iteration{" "}
              {currentIteration})
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modifiedIterationMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="iteration" stroke="#CBD5E0" />
                <YAxis stroke="#CBD5E0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2D3748",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => {
                    // For future iterations, show "Not active yet" for workers
                    const iterationNum = parseInt(
                      String(name).replace("Iteration ", "")
                    );
                    if (name === "workers" && iterationNum > currentIteration) {
                      return ["Not active yet", name];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar name="Workers" dataKey="workers" fill="#4299E1" />
                <Bar name="Tasks" dataKey="tasks" fill="#48BB78" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "eligibilityComparison" && (
          <>
            <p className="text-sm text-gray-300 mb-4">
              Proportion of eligible and non-eligible workers
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workerEligibility}
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
                  <Cell fill="#48BB78" /> {/* Eligible - Green */}
                  <Cell fill="#FC8181" /> {/* Not Eligible - Red */}
                </Pie>
                <Tooltip formatter={(value) => [`${value} workers`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "taskValidation" && (
          <>
            <p className="text-sm text-gray-300 mb-4">
              Proportion of validated and non-validated tasks
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskValidation}
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
                  <Cell fill="#48BB78" /> {/* Validated - Green */}
                  <Cell fill="#FC8181" /> {/* Not Validated - Red */}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tasks`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "accuracyDistribution" && (
          <>
            <p className="text-sm text-gray-300 mb-4">
              Distribution of worker accuracy ratings
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accuracyDistribution}
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
                  {accuracyDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} workers`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* Additional Summary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Worker Eligibility Summary */}
        <div className="bg-white/10 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">
            Worker Eligibility Status
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={workerEligibility}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                <Cell fill="#48BB78" /> {/* Eligible - Green */}
                <Cell fill="#FC8181" /> {/* Not Eligible - Red */}
              </Pie>
              <Tooltip formatter={(value) => [`${value} workers`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 mt-2 text-center">
            <div className="bg-white/5 p-2 rounded">
              <p className="text-sm text-gray-300">Eligible</p>
              <p className="text-xl font-bold text-green-400">
                {eligibleCount}
              </p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-sm text-gray-300">Not Eligible</p>
              <p className="text-xl font-bold text-red-400">
                {nonEligibleCount}
              </p>
            </div>
          </div>
        </div>

        {/* Task Validation Summary */}
        <div className="bg-white/10 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">
            Task Validation Status
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={taskValidation}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                <Cell fill="#48BB78" /> {/* Validated - Green */}
                <Cell fill="#FC8181" /> {/* Not Validated - Red */}
              </Pie>
              <Tooltip formatter={(value) => [`${value} tasks`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 mt-2 text-center">
            <div className="bg-white/5 p-2 rounded">
              <p className="text-sm text-gray-300">Validated</p>
              <p className="text-xl font-bold text-green-400">
                {validatedCount}
              </p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-sm text-gray-300">Not Validated</p>
              <p className="text-xl font-bold text-red-400">
                {nonValidatedCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
