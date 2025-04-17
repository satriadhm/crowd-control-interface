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

interface AlgorithmMetricsProps {
  algorithmPerformanceData: AlgorithmPerformanceData[];
}

export default function AlgorithmMetricsTab({
  algorithmPerformanceData,
}: AlgorithmMetricsProps) {
  return (
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
          <CardTitle className="text-white">
            Algorithm Response Time (ms)
          </CardTitle>
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
          <CardTitle className="text-white">
            Performance Metrics Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Month</TableHead>
                  <TableHead className="text-white">Accuracy Rate</TableHead>
                  <TableHead className="text-white">
                    Response Time (ms)
                  </TableHead>
                  <TableHead className="text-white">
                    Performance Trend
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {algorithmPerformanceData.map((metric, index) => {
                  // Calculate trends if possible
                  let accuracyTrend: boolean | undefined = undefined;
                  let responseTrend: boolean | undefined = undefined;

                  if (index > 0) {
                    const prevMetric = algorithmPerformanceData[index - 1];
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
                              <span className="text-green-400">Accuracy ↑</span>
                            )}
                            {accuracyTrend === false && (
                              <span className="text-red-400">Accuracy ↓</span>
                            )}
                            {responseTrend && (
                              <span className="text-green-400">Response ↑</span>
                            )}
                            {responseTrend === false && (
                              <span className="text-red-400">Response ↓</span>
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
  );
}
