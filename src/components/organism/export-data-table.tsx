// src/components/organism/export-data-table.tsx
"use client";

import { useQuery } from "@apollo/client";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { GET_TASK_RESULTS } from "@/graphql/queries/mx";

export default function ExportDataTable() {
  const { data, loading, error } = useQuery(GET_TASK_RESULTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading test results...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const testResults = data?.getTestResults || [];

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Test ID", "User", "Score", "Date"];
    const tableRows: (string | number)[][] = [];

    testResults.forEach(
      (result: {
        id: string;
        userName: string;
        score: number;
        date: string;
      }) => {
        const rowData = [result.id, result.userName, result.score, result.date];
        tableRows.push(rowData);
      }
    );

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.text("Test Results Report", 14, 15);
    doc.save("test_results.pdf");
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        <CSVLink data={testResults} filename="test_results.csv">
          <Button>Export CSV</Button>
        </CSVLink>
        <Button onClick={exportPDF}>Export PDF</Button>
      </div>
      <table className="min-w-full bg-white bg-opacity-10 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Test ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map(
            (result: {
              id: string;
              userName: string;
              score: number;
              date: string;
            }) => (
              <tr key={result.id}>
                <td className="border px-4 py-2">{result.id}</td>
                <td className="border px-4 py-2">{result.userName}</td>
                <td className="border px-4 py-2">{result.score}</td>
                <td className="border px-4 py-2">{result.date}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
