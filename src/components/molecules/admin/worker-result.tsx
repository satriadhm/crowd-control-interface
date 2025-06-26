// src/components/molecules/admin/worker-result.tsx

"use client";

import { useQuery, gql } from "@apollo/client";
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
import { GET_ALL_USERS } from "@/graphql/queries/users";
import { GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import {
  AlgorithmPerformanceData,
  TestResult,
  TesterAnalysisData,
} from "@/graphql/types/analysis";
import { User } from "@/graphql/types/users";
import { ThresholdSettings } from "@/graphql/types/utils";

// Import sub-components
import WorkerAnalysisOverview from "./worker-analysis/overview";
import WorkerPerformanceTab from "./worker-analysis/worker-performance";
import AlgorithmMetricsTab from "./worker-analysis/algorithm-metrics";
import TestResultsTab from "./worker-analysis/test-result";
import ThresholdConfiguration from "./threshold-settings";
import WorkerAnalysisControls from "./worker-analysis/worker-controls";

// Type definitions for GraphQL responses
interface DebugData {
  getAllUsers: User[];
  getTotalTasks: number;
}

interface ThresholdData {
  getThresholdSettings: ThresholdSettings;
}

interface PerformanceData {
  getAlgorithmPerformance: AlgorithmPerformanceData[];
}

interface TesterData {
  getTesterAnalysis: TesterAnalysisData[];
}

interface TestResultsData {
  getTestResults: TestResult[];
}

interface AllUsersData {
  getAllUsers: User[];
}

interface TotalTasksData {
  getTotalTasks: number;
}

// Debug query for troubleshooting
const DEBUG_QUERY = gql`
  query DebugWorkerData {
    getAllUsers(skip: 0, take: 100) {
      id
      firstName
      lastName
      role
      isEligible
      completedTasks {
        taskId
        answer
      }
    }
    getTotalTasks
  }
`;

export default function WorkerAnalysis() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [, setDebugInfo] = useState<DebugData | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { isRefreshing, handleRefresh } = useRefreshSync(1500);

  // Debug query for development
  const { data: debugData, refetch: refetchDebug } = useQuery<DebugData>(
    DEBUG_QUERY,
    {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setDebugInfo(data);
        console.log("Debug worker data:", data);

        // Log worker completion status
        const workers = data.getAllUsers.filter((u) => u.role === "worker");
        const totalTasks = data.getTotalTasks;

        console.log(`=== Worker Completion Analysis ===`);
        console.log(`Total Tasks: ${totalTasks}`);
        console.log(`Total Workers: ${workers.length}`);

        workers.forEach((worker) => {
          const completed = worker.completedTasks?.length || 0;
          const status =
            completed >= totalTasks ? "COMPLETED ALL" : "IN PROGRESS";
          console.log(
            `${worker.firstName} ${worker.lastName}: ${completed}/${totalTasks} tasks (${status}) - Eligible: ${worker.isEligible}`
          );
        });
      },
    }
  );

  // Fetch threshold settings first since other components depend on it
  const {
    data: thresholdData,
    loading: thresholdLoading,
    error: thresholdError,
    refetch: refetchThreshold,
  } = useQuery<ThresholdData>(GET_THRESHOLD_SETTINGS, {
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
  } = useQuery<PerformanceData>(GET_ALGORITHM_PERFORMANCE, {
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
  } = useQuery<TesterData>(GET_TESTER_ANALYSIS, {
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
  } = useQuery<TestResultsData>(GET_TEST_RESULTS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
    skip: thresholdLoading || !!thresholdError,
  });

  // Fetch all users data
  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersError,
    refetch: refetchAllUsers,
  } = useQuery<AllUsersData>(GET_ALL_USERS, {
    variables: { skip: 0, take: 1000 }, // Get all users
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
    skip: thresholdLoading || !!thresholdError,
  });

  // Fetch total tasks data
  const {
    data: totalTasksData,
    loading: totalTasksLoading,
    error: totalTasksError,
    refetch: refetchTotalTasks,
  } = useQuery<TotalTasksData>(GET_TOTAL_TASKS, {
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
        testResultsLoading ||
        allUsersLoading ||
        totalTasksLoading
    );

    const firstError =
      thresholdError ||
      performanceError ||
      testerError ||
      testResultsError ||
      allUsersError ||
      totalTasksError;
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
    allUsersLoading,
    totalTasksLoading,
    thresholdError,
    performanceError,
    testerError,
    testResultsError,
    allUsersError,
    totalTasksError,
  ]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing && !isLoading) {
        console.log("Auto-refreshing worker analysis data...");
        refreshAllData();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isRefreshing, isLoading]);

  // Function to refresh all data
  const refreshAllData = useCallback(async () => {
    console.log("Refreshing all worker analysis data...");

    await handleRefresh(async () => {
      try {
        // Refresh all data in parallel with no-cache
        await Promise.all([
          refetchThreshold({ fetchPolicy: "no-cache" }),
          refetchPerformance({ fetchPolicy: "no-cache" }),
          refetchTesterData({ fetchPolicy: "no-cache" }),
          refetchTestResults({ fetchPolicy: "no-cache" }),
          refetchAllUsers({ fetchPolicy: "no-cache" }),
          refetchTotalTasks({ fetchPolicy: "no-cache" }),
          refetchDebug({ fetchPolicy: "no-cache" }),
        ]);

        setLastRefresh(new Date());
        console.log("All data refreshed successfully");
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    });
  }, [
    refetchThreshold,
    refetchPerformance,
    refetchTesterData,
    refetchTestResults,
    refetchAllUsers,
    refetchTotalTasks,
    refetchDebug,
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

  // Development debug panel
  const DebugPanel = () => {
    if (process.env.NODE_ENV !== "development") return null;

    // Use actual query data instead of debug query only
    const allUsers = allUsersData?.getAllUsers || debugData?.getAllUsers || [];
    const totalTasks =
      totalTasksData?.getTotalTasks || debugData?.getTotalTasks || 0;
    const workers = allUsers.filter((u) => u.role === "worker");
    const workersCompletedAll = workers.filter(
      (w) => (w.completedTasks?.length || 0) >= totalTasks
    );

    return (
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-yellow-600">
        <h3 className="text-yellow-400 font-bold mb-2">
          🔧 Debug Panel (Development)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Total Workers:</p>
            <p className="text-white font-bold">{workers.length}</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Completed All Tasks:</p>
            <p className="text-white font-bold">{workersCompletedAll.length}</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Total Tasks:</p>
            <p className="text-white font-bold">{totalTasks}</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Tester Analysis Count:</p>
            <p className="text-white font-bold">
              {testerData?.getTesterAnalysis?.length || 0}
            </p>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          <p>Last Refresh: {lastRefresh.toLocaleTimeString()}</p>
          <p>
            Threshold: {(thresholdValue * 100).toFixed(1)}% ({thresholdType})
          </p>
          <p>
            Total Users: {allUsers.length} | Test Results:{" "}
            {testResultsData?.getTestResults?.length || 0}
          </p>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={refreshAllData}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            disabled={isRefreshing}
          >
            {isRefreshing ? "Refreshing..." : "Force Refresh"}
          </button>
          <button
            onClick={() => {
              console.log("All Users Data:", allUsersData);
              console.log("Total Tasks Data:", totalTasksData);
              console.log("Debug Data:", debugData);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Log All Data
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white relative">
      {refreshingOverlay}
      <div className="h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Worker Analysis Dashboard</h1>
          <div className="flex gap-4">
            <div className="text-sm text-gray-300">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
            <Button
              className="bg-[#001333] hover:bg-[#0a2e7e]"
              onClick={() => router.push("/task-management")}
            >
              Back to Task Management
            </Button>
          </div>
        </div>

        {/* Debug Panel for Development */}
        <DebugPanel />

        {/* Data Summary Section */}
        <div className="mb-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-lg border border-gray-600">
          <h3 className="text-white font-bold mb-4">📊 Data Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-600/20 p-3 rounded border border-blue-500/30">
              <p className="text-blue-300">Total Users:</p>
              <p className="text-white font-bold text-lg">
                {allUsersData?.getAllUsers?.length || 0}
              </p>
            </div>
            <div className="bg-green-600/20 p-3 rounded border border-green-500/30">
              <p className="text-green-300">Workers:</p>
              <p className="text-white font-bold text-lg">
                {allUsersData?.getAllUsers?.filter((u) => u.role === "worker")
                  .length || 0}
              </p>
            </div>
            <div className="bg-purple-600/20 p-3 rounded border border-purple-500/30">
              <p className="text-purple-300">Total Tasks:</p>
              <p className="text-white font-bold text-lg">
                {totalTasksData?.getTotalTasks || 0}
              </p>
            </div>
            <div className="bg-orange-600/20 p-3 rounded border border-orange-500/30">
              <p className="text-orange-300">Completed Workers:</p>
              <p className="text-white font-bold text-lg">
                {allUsersData?.getAllUsers?.filter(
                  (u) =>
                    u.role === "worker" &&
                    (u.completedTasks?.length || 0) >=
                      (totalTasksData?.getTotalTasks || 0)
                ).length || 0}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            <p>
              Progress:{" "}
              {totalTasksData?.getTotalTasks
                ? (
                    ((allUsersData?.getAllUsers?.filter(
                      (u) =>
                        u.role === "worker" &&
                        (u.completedTasks?.length || 0) >=
                          (totalTasksData?.getTotalTasks || 0)
                    ).length || 0) /
                      (allUsersData?.getAllUsers?.filter(
                        (u) => u.role === "worker"
                      ).length || 1)) *
                    100
                  ).toFixed(1)
                : 0}
              % workers have completed all tasks
            </p>
          </div>
        </div>

        {/* Manual Controls Section */}
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

        {/* Content based on active tab */}
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
