"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  GET_ALGORITHM_PERFORMANCE,
  GET_TEST_RESULTS,
  GET_TESTER_ANALYSIS,
} from "@/graphql/queries/m1";

export default function WorkerAnalysis() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch algorithm performance data
  const {
    data: performanceData,
    loading: performanceLoading,
    error: performanceError,
  } = useQuery(GET_ALGORITHM_PERFORMANCE, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Fetch tester analysis data
  const {
    data: testerData,
    loading: testerLoading,
    error: testerError,
  } = useQuery(GET_TESTER_ANALYSIS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Fetch test results data
  const {
    data: testResultsData,
    loading: testResultsLoading,
    error: testResultsError,
  } = useQuery(GET_TEST_RESULTS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  if (performanceLoading || testerLoading || testResultsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (performanceError || testerError || testResultsError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Error Loading Data
        </h2>
        <p className="text-white mb-4">
          {performanceError?.message ||
            testerError?.message ||
            testResultsError?.message}
        </p>
        <Button onClick={() => router.push("/task-management")}>
          Back to Task Management
        </Button>
      </div>
    );
  }

  // Process algorithm performance data
  const algorithmPerformanceData =
    performanceData?.getAlgorithmPerformance || [];

  // Process tester analysis data
  const testerAnalysisData = testerData?.getTesterAnalysis || [];

  // Sort testers by accuracy in descending order
  const sortedTesters = [...testerAnalysisData].sort(
    (a, b) => b.accuracy - a.accuracy
  );

  // Process test results data
  const testResults = testResultsData?.getTestResults || [];

  // Format date for test results
  const formattedTestResults = testResults.map((result) => ({
    ...result,
    formattedDate: new Date(result.createdAt).toLocaleDateString(),
  }));

  // Calculate accuracy distribution for pie chart
  const excellentCount = testerAnalysisData.filter(
    (t) => t.accuracy >= 0.9
  ).length;
  const goodCount = testerAnalysisData.filter(
    (t) => t.accuracy >= 0.8 && t.accuracy < 0.9
  ).length;
  const averageCount = testerAnalysisData.filter(
    (t) => t.accuracy >= 0.7 && t.accuracy < 0.8
  ).length;
  const belowAverageCount = testerAnalysisData.filter(
    (t) => t.accuracy < 0.7
  ).length;

  const accuracyDistribution = [
    { name: "Excellent (≥90%)", value: excellentCount, color: "#48BB78" },
    { name: "Good (80-89%)", value: goodCount, color: "#4299E1" },
    { name: "Average (70-79%)", value: averageCount, color: "#ECC94B" },
    {
      name: "Below Average (<70%)",
      value: belowAverageCount,
      color: "#F56565",
    },
  ];

  // Calculate average accuracy
  const averageAccuracy =
    testerAnalysisData.length > 0
      ? testerAnalysisData.reduce((sum, tester) => sum + tester.accuracy, 0) /
        testerAnalysisData.length
      : 0;

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <div className="h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Worker Analysis Dashboard</h1>
          <Button
            className="bg-[#001333] hover:bg-[#0a2e7e]"
            onClick={() => router.push("/task-management")}
          >
            Back to Task Management
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={
              activeTab === "overview"
                ? "bg-blue-600"
                : "border-blue-600 text-white"
            }
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "workers" ? "default" : "outline"}
            onClick={() => setActiveTab("workers")}
            className={
              activeTab === "workers"
                ? "bg-blue-600"
                : "border-blue-600 text-white"
            }
          >
            Worker Performance
          </Button>
          <Button
            variant={activeTab === "algorithm" ? "default" : "outline"}
            onClick={() => setActiveTab("algorithm")}
            className={
              activeTab === "algorithm"
                ? "bg-blue-600"
                : "border-blue-600 text-white"
            }
          >
            Algorithm Metrics
          </Button>
          <Button
            variant={activeTab === "results" ? "default" : "outline"}
            onClick={() => setActiveTab("results")}
            className={
              activeTab === "results"
                ? "bg-blue-600"
                : "border-blue-600 text-white"
            }
          >
            Test Results
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">
                    Total Workers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">
                    {testerAnalysisData.length}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Average Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">
                    {(averageAccuracy * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{testResults.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Side by side charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card className="bg-white/10 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Top 5 Performers</CardTitle>
                </CardHeader>
                <CardContent className="h-80 ">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sortedTesters.slice(0, 5)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#4A5568"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        domain={[0, 1]}
                        tickFormatter={(value) =>
                          `${(value * 100).toFixed(0)}%`
                        }
                        stroke="#CBD5E0"
                      />
                      <YAxis
                        dataKey="testerName"
                        type="category"
                        width={100}
                        stroke="#CBD5E0"
                      />
                      <Tooltip
                        formatter={(value) => [
                          `${(Number(value) * 100).toFixed(1)}%`,
                          "Accuracy",
                        ]}
                        contentStyle={{
                          backgroundColor: "#2D3748",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="accuracy"
                        fill="#48BB78"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Worker Accuracy Distribution */}
              <Card className="bg-white/10 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Accuracy Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
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
                          percent > 0
                            ? `${name}: ${(percent * 100).toFixed(0)}%`
                            : ""
                        }
                      >
                        {accuracyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} workers`, ""]}
                        contentStyle={{
                          backgroundColor: "#2D3748",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Algorithm Performance Over Time */}
            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Algorithm Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={algorithmPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="month" stroke="#CBD5E0" />
                    <YAxis
                      yAxisId="left"
                      stroke="#48BB78"
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      domain={[0.85, 1]}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#4299E1"
                      domain={[200, 300]}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "accuracyRate")
                          return [
                            `${(Number(value) * 100).toFixed(1)}%`,
                            "Accuracy Rate",
                          ];
                        return [`${value} ms`, "Response Time"];
                      }}
                      contentStyle={{
                        backgroundColor: "#2D3748",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="accuracyRate"
                      stroke="#48BB78"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      name="Accuracy Rate"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#4299E1"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      name="Response Time"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === "workers" && (
          <div className="space-y-6">
            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Worker Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={testerAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                      <XAxis dataKey="testerName" stroke="#CBD5E0" />
                      <YAxis
                        yAxisId="left"
                        stroke="#CBD5E0"
                        domain={[0, 1]}
                        tickFormatter={(value) =>
                          `${(value * 100).toFixed(0)}%`
                        }
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 1]}
                        tickFormatter={(value) =>
                          `${(value * 100).toFixed(0)}%`
                        }
                        stroke="#CBD5E0"
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "accuracy")
                            return [
                              `${(Number(value) * 100).toFixed(1)}%`,
                              "Accuracy",
                            ];
                          return [
                            `${(Number(value) * 100).toFixed(1)}%`,
                            "Average Score",
                          ];
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
                        dataKey="averageScore"
                        fill="#4299E1"
                        name="Average Score"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Worker Detail Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-white">
                          Worker Name
                        </TableHead>
                        <TableHead className="text-white">
                          Average Score
                        </TableHead>
                        <TableHead className="text-white">Accuracy</TableHead>
                        <TableHead className="text-white">
                          Performance Level
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testerAnalysisData.map((worker) => (
                        <TableRow key={worker.workerId}>
                          <TableCell className="font-medium text-white">
                            {worker.testerName}
                          </TableCell>
                          <TableCell  className="text-white">
                            {(worker.averageScore * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell  className="text-white">
                            {(worker.accuracy * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            {worker.accuracy >= 0.9 ? (
                              <span className="px-2 py-1 rounded-full bg-green-800 text-green-200">
                                Excellent
                              </span>
                            ) : worker.accuracy >= 0.8 ? (
                              <span className="px-2 py-1 rounded-full bg-blue-800 text-blue-200">
                                Good
                              </span>
                            ) : worker.accuracy >= 0.7 ? (
                              <span className="px-2 py-1 rounded-full bg-yellow-800 text-yellow-200">
                                Average
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full bg-red-800 text-red-200">
                                Below Average
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Algorithm Tab */}
        {activeTab === "algorithm" && (
          <div className="space-y-6">
            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Algorithm Accuracy Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
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
                      name="Accuracy Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Algorithm Response Time (ms)</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
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
                      name="Response Time"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-white">Month</TableHead>
                        <TableHead className="text-white">
                          Accuracy Rate
                        </TableHead>
                        <TableHead className="text-white">
                          Response Time (ms)
                        </TableHead>
                        <TableHead className="text-white">
                          Performance Trend
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody  className="text-white">
                      {algorithmPerformanceData.map((metric, index) => {
                        // Calculate trends if possible
                        let accuracyTrend: boolean | undefined = undefined;
                        let responseTrend: boolean | undefined = undefined;

                        if (index > 0) {
                          const prevMetric =
                            algorithmPerformanceData[index - 1];
                          accuracyTrend =
                            metric.accuracyRate > prevMetric.accuracyRate;
                          responseTrend =
                            metric.responseTime < prevMetric.responseTime;
                        }

                        return (
                          <TableRow key={metric.month}>
                            <TableCell className="font-medium text-white">
                              {metric.month}
                            </TableCell>
                            <TableCell>
                              {(metric.accuracyRate * 100).toFixed(1)}%
                            </TableCell>
                            <TableCell>{metric.responseTime} ms</TableCell>
                            <TableCell>
                              {index > 0 && (
                                <div className="flex items-center space-x-2">
                                  {accuracyTrend && (
                                    <span className="text-green-400">
                                      Accuracy ↑
                                    </span>
                                  )}
                                  {accuracyTrend === false && (
                                    <span className="text-red-400">
                                      Accuracy ↓
                                    </span>
                                  )}
                                  {responseTrend && (
                                    <span className="text-green-400">
                                      Response ↑
                                    </span>
                                  )}
                                  {responseTrend === false && (
                                    <span className="text-red-400">
                                      Response ↓
                                    </span>
                                  )}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-6">
            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>A list of recent test results</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-white">Test ID</TableHead>
                        <TableHead className="text-white">Worker ID</TableHead>
                        <TableHead className="text-white">Score</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formattedTestResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium text-white">
                            {result.testId.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {result.workerId.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {(result.score * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell>{result.formattedDate}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {result.feedback || "No feedback provided"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Score distribution chart */}
            <Card className="bg-white/10 border-0">
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        range: "0-50%",
                        count: testResults.filter((r) => r.score < 0.5).length,
                      },
                      {
                        range: "51-60%",
                        count: testResults.filter(
                          (r) => r.score >= 0.5 && r.score < 0.6
                        ).length,
                      },
                      {
                        range: "61-70%",
                        count: testResults.filter(
                          (r) => r.score >= 0.6 && r.score < 0.7
                        ).length,
                      },
                      {
                        range: "71-80%",
                        count: testResults.filter(
                          (r) => r.score >= 0.7 && r.score < 0.8
                        ).length,
                      },
                      {
                        range: "81-90%",
                        count: testResults.filter(
                          (r) => r.score >= 0.8 && r.score < 0.9
                        ).length,
                      },
                      {
                        range: "91-100%",
                        count: testResults.filter((r) => r.score >= 0.9).length,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="range" stroke="#CBD5E0" />
                    <YAxis stroke="#CBD5E0" />
                    <Tooltip
                      formatter={(value) => [`${value} tests`, "Count"]}
                      contentStyle={{
                        backgroundColor: "#2D3748",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="#805AD5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
