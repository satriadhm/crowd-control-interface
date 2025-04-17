// src/components/molecules/admin/worker-result.tsx
"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useState, useCallback, useEffect } from "react";
import { useRefreshSync } from "@/hooks/useRefreshSync";
import {
  GET_ALGORITHM_PERFORMANCE,
  GET_TEST_RESULTS,
  GET_TESTER_ANALYSIS,
} from "@/graphql/queries/mx";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isRefreshing, handleRefresh } = useRefreshSync(1500); // 1.5 second refresh animation

  // Fetch threshold settings first since other components depend on it
  const {
    data: thresholdData,
    loading: thresholdLoading,
    error: thresholdError,
    refetch: refetchThreshold,
  } = useQuery(GET_THRESHOLD_SETTINGS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

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
    skip: thresholdLoading || !!thresholdError,
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
    skip: thresholdLoading || !!thresholdError,
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
    skip: thresholdLoading || !!thresholdError,
  });

  // Update loading and error states based on all queries
  useEffect(() => {
    setIsLoading(
      thresholdLoading ||
        performanceLoading ||
        testerLoading ||
        testResultsLoading
    );

    const firstError =
      thresholdError || performanceError || testerError || testResultsError;
    if (firstError) {
      setError(firstError);
    } else {
      setError(null);
    }
  }, [
    thresholdLoading,
    performanceLoading,
    testerLoading,
    testResultsLoading,
    thresholdError,
    performanceError,
    testerError,
    testResultsError,
  ]);

  // Function to refresh all data - memoized with useCallback to prevent unnecessary re-renders
  const refreshAllData = useCallback(async () => {
    console.log("Refreshing all worker analysis data...");

    // Use handleRefresh to manage the loading state visualization
    await handleRefresh(async () => {
      // First refresh threshold settings
      await refetchThreshold();

      // Then refresh all other data in parallel
      await Promise.all([
        refetchPerformance(),
        refetchTesterData(),
        refetchTestResults(),
      ]);

      console.log("All data refreshed successfully");
    });
  }, [
    refetchThreshold,
    refetchPerformance,
    refetchTesterData,
    refetchTestResults,
    handleRefresh,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <span className="ml-3 text-white">Loading analysis data...</span>
      </div>
    );
  }

  // Show a subtle overlay for refreshing state while keeping UI interactive
  const refreshingOverlay = isRefreshing && (
    <div className="fixed inset-0 bg-black/10 pointer-events-none flex items-center justify-center z-50">
      <div className="bg-gray-900/80 p-4 rounded-lg shadow-lg flex items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400 mr-3"></div>
        <span className="text-blue-300">Refreshing data...</span>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Error Loading Data
        </h2>
        <p className="text-white mb-4">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={refreshAllData}
            className="bg-blue-600 hover:bg-blue-800"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/task-management")}
            className="bg-gray-600 hover:bg-gray-800"
          >
            Back to Task Management
          </Button>
        </div>
      </div>
    );
  }

  // Get threshold value for passing to child components
  const thresholdValue =
    thresholdData?.getThresholdSettings?.thresholdValue || 0.7;
  const thresholdType =
    thresholdData?.getThresholdSettings?.thresholdType || "median";

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white relative">
      {refreshingOverlay}
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

        {/* Manual Controls Section - Pass the memoized refreshAllData function */}
        <WorkerAnalysisControls
          refreshAllData={refreshAllData}
          thresholdValue={thresholdValue}
          thresholdType={thresholdType}
        />

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

        {/* Content based on active tab - Pass the memoized refreshAllData function to all components */}
        {activeTab === "overview" && (
          <WorkerAnalysisOverview
            testerAnalysisData={testerData?.getTesterAnalysis || []}
            testResults={testResultsData?.getTestResults || []}
            algorithmPerformanceData={
              performanceData?.getAlgorithmPerformance || []
            }
            refreshData={refreshAllData}
            thresholdValue={thresholdValue}
            thresholdType={thresholdType}
          />
        )}

        {activeTab === "workers" && (
          <WorkerPerformanceTab
            testerAnalysisData={testerData?.getTesterAnalysis || []}
            refreshData={refreshAllData}
            thresholdValue={thresholdValue}
            thresholdType={thresholdType}
          />
        )}

        {activeTab === "algorithm" && (
          <AlgorithmMetricsTab
            algorithmPerformanceData={
              performanceData?.getAlgorithmPerformance || []
            }
            refreshData={refreshAllData}
            thresholdValue={thresholdValue}
            thresholdType={thresholdType}
          />
        )}

        {activeTab === "results" && (
          <TestResultsTab
            testResults={testResultsData?.getTestResults || []}
            refreshData={refreshAllData}
          />
        )}

        {activeTab === "threshold" && (
          <ThresholdConfiguration onThresholdUpdate={refreshAllData} />
        )}
      </div>
    </div>
  );
}
