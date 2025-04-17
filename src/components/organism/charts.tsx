"use client"

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
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

// Default colors for pie charts
const COLORS = ["#48BB78", "#FC8181", "#F6AD55", "#4299E1"];

// GraphQL query for dashboard data
const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    getDashboardSummary {
      iterationMetrics {
        iteration
        workers
        tasks
      }
      workerEligibility {
        name
        value
      }
      taskValidation {
        name
        value
      }
      accuracyDistribution {
        name
        value
      }
    }
  }
`;

export default function DashboardCharts() {
  const [activeChart, setActiveChart] = useState("iterationMetrics");

  // Use the Apollo useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Extract dashboard data from the query result
  const dashboardData = data?.getDashboardSummary;

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

  // If no data, provide default
  if (!dashboardData) {
    return <div>No data available</div>;
  }

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
              Number of workers and tasks across iterations
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.iterationMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="iteration" stroke="#CBD5E0" />
                <YAxis stroke="#CBD5E0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2D3748",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar name="Workers" dataKey="workers" fill="#4299E1" />
                <Bar name="Tasks" dataKey="tasks" fill="#48BB78" />
              </BarChart>
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
                  data={dashboardData.accuracyDistribution}
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
                  {dashboardData.accuracyDistribution.map((entry, index) => (
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

      {/* Additional Summary - Worker Eligibility Status */}
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">
          Worker Eligibility Status
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={dashboardData.workerEligibility}
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
              <Cell fill="#F6AD55" /> {/* Pending - Orange */}
            </Pie>
            <Tooltip formatter={(value) => [`${value} workers`, ""]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 mt-2 text-center gap-2">
          <div className="bg-white/5 p-2 rounded">
            <p className="text-sm text-gray-300">Eligible</p>
            <p className="text-xl font-bold text-green-400">
              {dashboardData.workerEligibility.find(
                (item) => item.name === "Eligible"
              )?.value || 0}
            </p>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <p className="text-sm text-gray-300">Not Eligible</p>
            <p className="text-xl font-bold text-red-400">
              {dashboardData.workerEligibility.find(
                (item) => item.name === "Not Eligible"
              )?.value || 0}
            </p>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <p className="text-sm text-gray-300">Pending</p>
            <p className="text-xl font-bold text-yellow-400">
              {dashboardData.workerEligibility.find(
                (item) => item.name === "Pending"
              )?.value || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Task Validation Status */}
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">
          Task Validation Status
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={dashboardData.taskValidation}
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
              {dashboardData.taskValidation[0].value}
            </p>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <p className="text-sm text-gray-300">Not Validated</p>
            <p className="text-xl font-bold text-red-400">
              {dashboardData.taskValidation[1].value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
