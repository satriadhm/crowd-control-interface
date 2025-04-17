// src/components/molecules/admin/worker-analysis/overview.tsx
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TesterAnalysisData,
  TestResult,
  AlgorithmPerformanceData,
} from "@/graphql/types/analysis";
import { useQuery } from "@apollo/client";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";

interface OverviewProps {
  testerAnalysisData: TesterAnalysisData[];
  testResults: TestResult[];
  algorithmPerformanceData: AlgorithmPerformanceData[];
}

export default function WorkerAnalysisOverview({
  testerAnalysisData,
  testResults,
  algorithmPerformanceData,
}: OverviewProps) {
  // Sort testers by accuracy in descending order
  const sortedTesters = [...testerAnalysisData].sort(
    (a, b) => b.accuracy - a.accuracy
  );

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

  // Calculate eligible vs not eligible count
  // Calculate eligibility counts based on actual accuracy vs threshold
  // This replaces the use of the stored isEligible field which may have inconsistencies

  // Fetch threshold settings
  const { data: thresholdData } = useQuery(GET_THRESHOLD_SETTINGS);
  const thresholdValue =
    thresholdData?.getThresholdSettings?.thresholdValue || 0.7;
  const thresholdType =
    thresholdData?.getThresholdSettings?.thresholdType || "median";

  // Exact threshold value without rounding for accurate eligibility calculation
  const exactThresholdValue = thresholdValue;

  // Calculate accurate eligibility counts based on exact threshold
  const eligibleCount = testerAnalysisData.filter(
    (t) => t.accuracy > exactThresholdValue
  ).length;

  const notEligibleCount = testerAnalysisData.filter(
    (t) => t.accuracy <= exactThresholdValue
  ).length;

  const pendingCount = testerAnalysisData.filter(
    (t) => t.accuracy === null || t.accuracy === undefined
  ).length;

  // Convert algorithm performance data to daily visualization
  // This assumes the month field can be converted to a date
  const dailyPerformanceData = algorithmPerformanceData.map((item, index) => ({
    day: `Day ${index + 1}`,
    accuracyRate: item.accuracyRate,
    responseTime: item.responseTime,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Total Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {testerAnalysisData.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">
              Average Accuracy
            </CardTitle>
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
            <p className="text-3xl font-bold text-white">
              {testResults.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Threshold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {(thresholdValue * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-400">
              Type:{" "}
              {thresholdType.charAt(0).toUpperCase() + thresholdType.slice(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Status Overview */}
      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">Eligibility Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-800/30 p-4 rounded-lg text-center text-white">
              <div className="text-3xl font-bold text-green-400">
                {eligibleCount}
              </div>
              <div className="text-sm text-green-200">Eligible Workers</div>
            </div>
            <div className="bg-red-800/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-400">
                {notEligibleCount}
              </div>
              <div className="text-sm text-red-200">Not Eligible Workers</div>
            </div>
            <div className="bg-yellow-800/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {pendingCount}
              </div>
              <div className="text-sm text-yellow-200">Pending Evaluation</div>
            </div>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg text-sm mt-2">
            <p className="text-blue-300 flex items-center">
              <span className="mr-2">•</span>
              Workers with accuracy above {(thresholdValue * 100).toFixed(1)}%
              are marked as eligible
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Side by side charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers Chart */}
        <Card className="bg-white/10 border-0">
          <CardHeader>
            <CardTitle className="text-white">Top 5 Performers</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
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
                  domain={[0.5, 1]}
                  tickCount={6}
                  tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
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
                <Bar dataKey="accuracy" fill="#48BB78" radius={[0, 4, 4, 0]} />
                {/* Adding a reference line for the threshold */}
                <ReferenceLine
                  x={thresholdValue}
                  stroke="#FF8C00"
                  strokeDasharray="3 3"
                  label={{
                    value: `Threshold: ${(thresholdValue * 100).toFixed(1)}%`,
                    position: "insideBottomLeft",
                    fill: "#FF8C00",
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Worker Accuracy Distribution Pie Chart */}
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
                    percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
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

      {/* Algorithm Performance Over Time - Daily View */}
      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">
            Algorithm Performance by Day
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="day" stroke="#CBD5E0" />
              <YAxis
                yAxisId="left"
                stroke="#48BB78"
                tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
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
              {/* Add threshold reference line */}
              <ReferenceLine
                y={thresholdValue}
                yAxisId="left"
                stroke="#FF8C00"
                strokeDasharray="3 3"
                label={{
                  value: `Threshold: ${(thresholdValue * 100).toFixed(1)}%`,
                  position: "insideLeft",
                  fill: "#FF8C00",
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// Import ReferenceLine at the top of your file
import { ReferenceLine } from "recharts";
