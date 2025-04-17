// src/components/molecules/admin/worker-analysis/test-result.tsx
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { TestResult } from "@/graphql/types/analysis";

interface TestResultsProps {
  testResults: TestResult[];
  refreshData: () => void; // Add refreshData prop
}

export default function TestResultsTab({
  testResults,
  refreshData,
}: TestResultsProps) {
  // State to track if a refresh is in progress
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate total pages
  const totalItems = testResults.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Get current page data
  const currentPageData = testResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler for pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  // Handler for refreshing data
  const handleRefreshData = () => {
    setIsRefreshing(true);
    refreshData();
    // Reset refreshing state after a delay to give visual feedback
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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
      {/* Add refresh button at the top */}
      <div className="flex justify-end">
        <Button
          onClick={handleRefreshData}
          disabled={isRefreshing}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Test Results"}
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-white/10 border-0 text-white">
        <CardHeader>
          <CardTitle>Test Results Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-300">Total Results</span>
              <span className="text-3xl font-bold">{testResults.length}</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-300">Average Score</span>
              <span className="text-3xl font-bold">
                {testResults.length > 0
                  ? (
                      (testResults.reduce(
                        (sum, result) => sum + result.score,
                        0
                      ) /
                        testResults.length) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-300">Last Result</span>
              <span className="text-lg mt-1">
                {testResults.length > 0
                  ? testResults[0].formattedDate
                  : "No results"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-0 text-white">
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
                  <TableHead className="text-white">Eligibility</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((result) => (
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

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
              >
                Previous
              </Button>
              <div className="text-white">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
              >
                Next
              </Button>
            </div>

            <div className="mt-2 text-xs text-gray-400 text-center">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              test results
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score distribution chart */}
      <Card className="bg-white/10 border-0 text-white">
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

      {/* No data state */}
      {testResults.length === 0 && (
        <Card className="bg-white/10 border-0 text-white">
          <CardContent className="p-12 text-center">
            <p className="text-xl mb-4">No test results available yet</p>
            <p className="text-gray-400">
              When workers complete tests, their results will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
