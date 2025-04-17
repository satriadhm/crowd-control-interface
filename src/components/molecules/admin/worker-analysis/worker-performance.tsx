// src/components/molecules/worker-analysis/worker-performance.tsx
import {
  BarChart,
  Bar,
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

interface WorkerPerformanceProps {
  testerAnalysisData: any[];
}

export default function WorkerPerformanceTab({
  testerAnalysisData,
}: WorkerPerformanceProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-0">
        <CardHeader>
          <CardTitle className="text-white">
            Worker Performance Comparison
          </CardTitle>
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
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
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
                  <TableHead className="text-white">Worker Name</TableHead>
                  <TableHead className="text-white">Average Score</TableHead>
                  <TableHead className="text-white">Accuracy</TableHead>
                  <TableHead className="text-white">
                    Eligibility Status
                  </TableHead>
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
                    <TableCell className="text-white">
                      {(worker.averageScore * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-white">
                      {(worker.accuracy * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-white">
                      {worker.isEligible === true ? (
                        <span className="px-2 py-1 rounded-full bg-green-800 text-green-200">
                          Eligible
                        </span>
                      ) : worker.isEligible === false ? (
                        <span className="px-2 py-1 rounded-full bg-red-800 text-red-200">
                          Not Eligible
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-yellow-800 text-yellow-200">
                          Pending
                        </span>
                      )}
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
  );
}
