"use client";

import Sidebar from "@/components/molecules/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ExportDataTable from "@/components/organism/export-data-table";

export default function ExportDataPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">Export Test Results</h1>
        <ExportDataTable />
        <Button
          onClick={() => router.push("/task-management")}
          className="mt-6"
        >
          Back to Task Management
        </Button>
      </main>
    </div>
  );
}
