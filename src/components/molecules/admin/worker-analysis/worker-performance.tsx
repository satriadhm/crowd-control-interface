// src/components/molecules/admin/worker-analysis/worker-performance.tsx
import { useState } from "react";
import {
  BarChart,
  Bar,
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
import { Button } from "@/components/ui/button";
import { TesterAnalysisData } from "@/graphql/types/analysis";
import { useQuery } from "@apollo/client";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";
import { RefreshCw } from "lucide-react";

interface WorkerPerformanceProps {
  testerAnalysisData: TesterAnalysisData[];
  refreshData: () => void; // Add refreshData prop
}

export default function WorkerPerformanceTab({
  testerAnalysisData,
  refreshData,
}: WorkerPerformanceProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalItems = testerAnalysisData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Get current page data
  const currentPageData = testerAnalysisData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get threshold value
  const { data: thresholdData, refetch: refetchThresholdData } = useQuery(
    GET_THRESHOLD_SETTINGS
  );
  const thresholdValue =
    thresholdData?.getThresholdSettings?.thresholdValue || 0.7;
  const thresholdType =
    thresholdData?.getThresholdSettings?.thresholdType || "median";

  // This is the raw threshold value without rounding - important for exact comparisons
  const exactThreshold = thresholdValue;

  // Handler for pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  // Handler for refresh data - refreshes all parent data and threshold data
  const handleRefreshData = () => {
    refreshData();
    refetchThresholdData();
  };

  return (
    <div className="space-y-6">
      {/* Add refresh button at the top */}
      <div className="flex justify-end">
        <Button
          onClick={handleRefreshData}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Refresh Worker Data
        </Button>
      </div>

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
                  stroke="#CBD5E0"
                  domain={[0.5, 1]}
                  tickCount={10}
                  tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
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
                <Legend />
                <Bar
                  dataKey="accuracy"
                  fill="#48BB78"
                  name="Accuracy"
                  radius={[4, 4, 0, 0]}
                />
                {/* Adding threshold reference line */}
                <ReferenceLine
                  y={exactThreshold}
                  stroke="#FF8C00"
                  strokeDasharray="3 3"
                  label={{
                    value: `Threshold (${thresholdType}): ${
                      exactThreshold.toString().includes(".")
                        ? `${(exactThreshold * 100).toFixed(4)}%`
                        : `${exactThreshold * 100}%`
                    }`,
                    position: "insideBottomRight",
                    fill: "#FF8C00",
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-blue-900/30 rounded-lg text-sm">
            <p className="text-blue-300">
              Worker accuracy is measured on a scale from 0 to 1 (0-100%). The
              orange line indicates the current eligibility threshold.
            </p>
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
                  <TableHead className="text-white">Accuracy</TableHead>
                  <TableHead className="text-white">
                    Eligibility Status
                  </TableHead>
                  <TableHead className="text-white">
                    Performance Level
                  </TableHead>
                  <TableHead className="text-white">Threshold Diff</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((worker) => {
                  // Calculate the exact difference without rounding
                  const exactDiffFromThreshold =
                    worker.accuracy - exactThreshold;

                  // Determine eligibility status based on exact comparison to threshold
                  // Display the calculated eligibility instead of using the stored value
                  const calculatedEligibility =
                    worker.accuracy > exactThreshold;

                  return (
                    <TableRow key={worker.workerId}>
                      <TableCell className="font-medium text-white">
                        {worker.testerName}
                      </TableCell>
                      <TableCell className="text-white">
                        {(worker.accuracy * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-white">
                        {calculatedEligibility ? (
                          <span className="px-2 py-1 rounded-full bg-green-800 text-green-200">
                            Eligible
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-red-800 text-red-200">
                            Not Eligible
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
                      <TableCell>
                        <span
                          className={`${
                            exactDiffFromThreshold >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {exactDiffFromThreshold >= 0 ? "+" : ""}
                          {(exactDiffFromThreshold * 100).toFixed(1)}%
                        </span>
                        {exactDiffFromThreshold >= 0 && (
                          <span className="ml-2 text-xs text-green-300">
                            (Eligible)
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
              workers
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
