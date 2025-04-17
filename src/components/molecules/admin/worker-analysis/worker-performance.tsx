// src/components/molecules/worker-analysis/worker-performance.tsx
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

interface WorkerPerformanceProps {
  testerAnalysisData: TesterAnalysisData[];
}

export default function WorkerPerformanceTab({
  testerAnalysisData,
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

  // Handler for pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

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
                  stroke="#CBD5E0"
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
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
                {currentPageData.map((worker) => (
                  <TableRow key={worker.workerId}>
                    <TableCell className="font-medium text-white">
                      {worker.testerName}
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
