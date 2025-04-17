// src/components/molecules/admin/worker-result.tsx
"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  GET_ALGORITHM_PERFORMANCE,
  GET_TEST_RESULTS,
  GET_TESTER_ANALYSIS,
} from "@/graphql/queries/mx";

// Import sub-components
import WorkerAnalysisOverview from "./worker-analysis/overview";
import WorkerPerformanceTab from "./worker-analysis/worker-performance";
import AlgorithmMetricsTab from "./worker-analysis/algorithm-metrics";
import TestResultsTab from "./worker-analysis/test-result";
import ThresholdConfiguration from "./threshold-settings";
import WorkerAnalysisControls from "./worker-analysis/worker-controls";

export default function WorkerAnalysis() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch algorithm performance data
  const {
    data: performanceData,
    loading: performanceLoading,
    error: performanceError,
    refetch: refetchPerformance,
  } = useQuery(GET_ALGORITHM_PERFORMANCE, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Fetch tester analysis data
  const {
    data: testerData,
    loading: testerLoading,
    error: testerError,
    refetch: refetchTesterData,
  } = useQuery(GET_TESTER_ANALYSIS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Fetch test results data
  const {
    data: testResultsData,
    loading: testResultsLoading,
    error: testResultsError,
    refetch: refetchTestResults,
  } = useQuery(GET_TEST_RESULTS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Function to refresh all data
  const refreshAllData = () => {
    refetchPerformance();
    refetchTesterData();
    refetchTestResults();
  };

  if (performanceLoading || testerLoading || testResultsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (performanceError || testerError || testResultsError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Error Loading Data
        </h2>
        <p className="text-white mb-4">
          {performanceError?.message ||
            testerError?.message ||
            testResultsError?.message}
        </p>
        <Button onClick={() => router.push("/task-management")}>
          Back to Task Management
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      <div className="h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Worker Analysis Dashboard</h1>
          <Button
            className="bg-[#001333] hover:bg-[#0a2e7e]"
            onClick={() => router.push("/task-management")}
          >
            Back to Task Management
          </Button>
        </div>

        {/* Manual Controls Section */}
        <WorkerAnalysisControls refreshAllData={refreshAllData} />

        {/* Tab Navigation */}
        <div className="flex flex-wrap space-x-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={
              activeTab === "overview"
                ? "bg-blue-600 text-white font-medium mb-2"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 mb-2"
            }
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "workers" ? "default" : "outline"}
            onClick={() => setActiveTab("workers")}
            className={
              activeTab === "workers"
                ? "bg-blue-600 text-white font-medium mb-2"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 mb-2"
            }
          >
            Worker Performance
          </Button>
          <Button
            variant={activeTab === "algorithm" ? "default" : "outline"}
            onClick={() => setActiveTab("algorithm")}
            className={
              activeTab === "algorithm"
                ? "bg-blue-600 text-white font-medium mb-2"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 mb-2"
            }
          >
            Algorithm Metrics
          </Button>
          <Button
            variant={activeTab === "results" ? "default" : "outline"}
            onClick={() => setActiveTab("results")}
            className={
              activeTab === "results"
                ? "bg-blue-600 text-white font-medium mb-2"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 mb-2"
            }
          >
            Test Results
          </Button>
          <Button
            variant={activeTab === "threshold" ? "default" : "outline"}
            onClick={() => setActiveTab("threshold")}
            className={
              activeTab === "threshold"
                ? "bg-blue-600 text-white font-medium mb-2"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 mb-2"
            }
          >
            Threshold Settings
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <WorkerAnalysisOverview
            testerAnalysisData={testerData?.getTesterAnalysis || []}
            testResults={testResultsData?.getTestResults || []}
            algorithmPerformanceData={
              performanceData?.getAlgorithmPerformance || []
            }
          />
        )}

        {activeTab === "workers" && (
          <WorkerPerformanceTab
            testerAnalysisData={testerData?.getTesterAnalysis || []}
          />
        )}

        {activeTab === "algorithm" && (
          <AlgorithmMetricsTab
            algorithmPerformanceData={
              performanceData?.getAlgorithmPerformance || []
            }
          />
        )}

        {activeTab === "results" && (
          <TestResultsTab testResults={testResultsData?.getTestResults || []} />
        )}

        {activeTab === "threshold" && <ThresholdConfiguration />}
      </div>
    </div>
  );
}
