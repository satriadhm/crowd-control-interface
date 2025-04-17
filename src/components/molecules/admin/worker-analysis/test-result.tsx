// src/components/molecules/worker-analysis/test-results.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TestResultsProps {
  testResults: any[];
}

export default function TestResultsTab({ testResults }: TestResultsProps) {
  // Create data for score distribution chart
  const scoreDistributionData = [
    {
      range: "0-50%",
      count: testResults.filter((r) => r.score < 0.5).length,
    },
    {
      range: "51-60%",
      count: testResults.filter((r) => r.score >= 0.5 && r.score < 0.6).length,
    },
    {
      range: "61-70%",
      count: testResults.filter((r) => r.score >= 0.6 && r.score < 0.7).length,
    },
    {
      range: "71-80%",
      count: testResults.filter((r) => r.score >= 0.7 && r.score < 0.8).length,
    },
    {
      range: "81-90%",
      count: testResults.filter((r) => r.score >= 0.8 && r.score < 0.9).length,
    },
    {
      range: "91-100%",
      count: testResults.filter((r) => r.score >= 0.9).length,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-0 text-white">
        <CardHeader>
          <CardTitle className="text-white">Test Results</CardTitle>
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
                  <TableHead className="text-white">Eligibility</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium text-white">
                      {result.testId.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{result.workerId.substring(0, 8)}...</TableCell>
                    <TableCell>{(result.score * 100).toFixed(1)}%</TableCell>
                    <TableCell>
                      {result.eligibilityStatus === "Eligible" ? (
                        <span className="px-2 py-1 rounded-full bg-green-800 text-green-200">
                          Eligible
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-800 text-red-200">
                          Not Eligible
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{result.formattedDate || "N/A"}</TableCell>
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
            <BarChart data={scoreDistributionData}>
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
  );
}
