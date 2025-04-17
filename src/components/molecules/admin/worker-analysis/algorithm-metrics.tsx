// src/components/molecules/admin/worker-analysis/algorithm-metrics.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlgorithmPerformanceData } from "@/graphql/types/analysis";
import { useQuery } from "@apollo/client";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";

interface AlgorithmMetricsProps {
  algorithmPerformanceData: AlgorithmPerformanceData[];
}

export default function AlgorithmMetricsTab({
  algorithmPerformanceData,
}: AlgorithmMetricsProps) {
  // Get threshold value
  const { data: thresholdData } = useQuery(GET_THRESHOLD_SETTINGS);
  const thresholdValue =
    thresholdData?.getThresholdSettings?.thresholdValue || 0.7;
  const thresholdType =
    thresholdData?.getThresholdSettings?.thresholdType || "median";

  // Store exact threshold value without rounding for accurate eligibility calculations
  const exactThresholdValue = thresholdValue;

  // Transform data to show daily performance instead of monthly
  const dailyPerformanceData = algorithmPerformanceData.map((item, index) => ({
    day: `Day ${index + 1}`,
    accuracyRate: item.accuracyRate,
    responseTime: item.responseTime,
    date: item.month, // keep the original month data for reference
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">
            Daily Algorithm Accuracy Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="day" stroke="#CBD5E0" />
              <YAxis
                stroke="#CBD5E0"
                tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                domain={[0.85, 1]}
                tickCount={8}
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
                labelFormatter={(label) => {
                  const dataItem = dailyPerformanceData.find(
                    (item) => item.day === label
                  );
                  return `${label} (${dataItem?.date || ""})`;
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
              {/* Add threshold reference line */}
              <ReferenceLine
                y={exactThresholdValue}
                stroke="#FF8C00"
                strokeDasharray="3 3"
                label={{
                  value: `Threshold: ${
                    exactThresholdValue.toString().includes(".")
                      ? `${(exactThresholdValue * 100).toFixed(4)}%`
                      : `${exactThresholdValue * 100}%`
                  }`,
                  position: "right",
                  fill: "#FF8C00",
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">
            Daily Algorithm Response Time (ms)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="day" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" domain={[200, 300]} />
              <Tooltip
                formatter={(value) => [`${value} ms`, "Response Time"]}
                contentStyle={{
                  backgroundColor: "#2D3748",
                  border: "none",
                  borderRadius: "8px",
                }}
                labelFormatter={(label) => {
                  const dataItem = dailyPerformanceData.find(
                    (item) => item.day === label
                  );
                  return `${label} (${dataItem?.date || ""})`;
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
          <CardTitle className="text-white">
            Daily Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 mb-4 bg-blue-900/30 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <p className="text-white">
                Current Threshold:{" "}
                <span className="font-semibold">
                  {exactThresholdValue.toString().includes(".")
                    ? `${(exactThresholdValue * 100).toFixed(4)}%`
                    : `${exactThresholdValue * 100}%`}
                </span>{" "}
                ({thresholdType})
              </p>
            </div>
            <p className="text-sm text-gray-300">
              This threshold is used to determine worker eligibility status.
              Workers with accuracy strictly greater than this threshold are
              eligible.
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Workers with accuracy exactly equal to or less than the threshold
              are not eligible.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Day</TableHead>
                  <TableHead className="text-white">Original Period</TableHead>
                  <TableHead className="text-white">Accuracy Rate</TableHead>
                  <TableHead className="text-white">
                    Response Time (ms)
                  </TableHead>
                  <TableHead className="text-white">
                    Accuracy vs Threshold
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {dailyPerformanceData.map((metric, index) => {
                  // Calculate difference from threshold
                  // Calculate the exact difference between accuracy rate and threshold
                  const accuracyDiff =
                    metric.accuracyRate - exactThresholdValue;

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-white">
                        {metric.day}
                      </TableCell>
                      <TableCell>{metric.date}</TableCell>
                      <TableCell>
                        {(metric.accuracyRate * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>{metric.responseTime} ms</TableCell>
                      <TableCell>
                        <span
                          className={`${
                            accuracyDiff >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {accuracyDiff >= 0 ? "+" : ""}
                          {(accuracyDiff * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">
            Algorithm Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">
                Accuracy Trend Analysis
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                The algorithm&apos;s accuracy has been tracked daily since
                deployment. The data shows:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>
                  Starting accuracy of{" "}
                  {(dailyPerformanceData[0]?.accuracyRate * 100).toFixed(1)}%
                </li>
                <li>
                  Current accuracy of{" "}
                  {(
                    dailyPerformanceData[dailyPerformanceData.length - 1]
                      ?.accuracyRate * 100
                  ).toFixed(1)}
                  %
                </li>
                <li>
                  Average accuracy of{" "}
                  {(
                    (dailyPerformanceData.reduce(
                      (sum, item) => sum + item.accuracyRate,
                      0
                    ) /
                      dailyPerformanceData.length) *
                    100
                  ).toFixed(1)}
                  %
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">
                Response Time Analysis
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                Response time metrics show performance improvements:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>
                  Initial response time: {dailyPerformanceData[0]?.responseTime}{" "}
                  ms
                </li>
                <li>
                  Current response time:{" "}
                  {
                    dailyPerformanceData[dailyPerformanceData.length - 1]
                      ?.responseTime
                  }{" "}
                  ms
                </li>
                <li>
                  Average response time:{" "}
                  {Math.round(
                    dailyPerformanceData.reduce(
                      (sum, item) => sum + item.responseTime,
                      0
                    ) / dailyPerformanceData.length
                  )}{" "}
                  ms
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
