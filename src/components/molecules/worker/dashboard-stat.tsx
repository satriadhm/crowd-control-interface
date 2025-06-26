// src/components/molecules/worker/dashboard-stat.tsx

"use client";

import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import { GET_TOTAL_USERS } from "@/graphql/queries/users";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { RESET_DONE_TASK } from "@/graphql/mutations/users";
import { User } from "@/graphql/types/users";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Globe,
  BookOpen,
  BarChart4,
  BellRing,
  RefreshCw,
  AlertTriangle,
  Clock,
  Users as UsersIcon,
} from "lucide-react";

interface DashboardStatsProps {
  user: User;
  accessToken: string | null;
}

export default function DashboardStats({
  user,
  accessToken,
}: DashboardStatsProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [eligibilityStatus, setEligibilityStatus] = useState(user?.isEligible);
  const [lastEligibilityCheck, setLastEligibilityCheck] = useState<Date | null>(
    null
  );
  const [isPollingEligibility, setIsPollingEligibility] = useState(false);
  const client = useApolloClient();

  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useQuery(GET_TOTAL_TASKS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_TOTAL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const [resetDoneTask] = useMutation(RESET_DONE_TASK, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onCompleted: () => {
      setIsResetting(false);
      window.location.reload();
    },
    onError: (error) => {
      setIsResetting(false);
      alert(`Error resetting tasks: ${error.message}`);
    },
  });

  const totalTasks = tasksData?.getTotalTasks || 0;
  const totalActiveUsers = usersData?.getTotalUsers || 0;
  const completedTasksCount = user?.completedTasks?.length || 0;
  const hasCompletedAllTasks = completedTasksCount >= totalTasks;

  // Poll for eligibility updates when user has completed all tasks but is still pending
  useEffect(() => {
    if (hasCompletedAllTasks && eligibilityStatus === null && accessToken) {
      setIsPollingEligibility(true);

      const pollInterval = setInterval(async () => {
        try {
          console.log("Polling for eligibility status update...");
          const { data } = await client.query({
            query: GET_LOGGED_IN_USER,
            variables: { token: accessToken },
            fetchPolicy: "no-cache",
          });

          setLastEligibilityCheck(new Date());

          if (data.me.isEligible !== null) {
            console.log("Eligibility status updated:", data.me.isEligible);
            setEligibilityStatus(data.me.isEligible);
            setIsPollingEligibility(false);
            clearInterval(pollInterval);

            // Show notification for eligibility result
            if (data.me.isEligible) {
              alert(
                "🎉 Great news! You are now eligible for UAT access! Your accuracy met the required threshold."
              );
            } else {
              alert(
                "📊 Your eligibility evaluation is complete. Unfortunately, your accuracy did not meet the threshold this time. You can reset your tasks and try again!"
              );
            }
          }
        } catch (error) {
          console.error("Error polling eligibility status:", error);
        }
      }, 10000); // Check every 10 seconds

      // Stop polling after 5 minutes to prevent indefinite polling
      const timeoutId = setTimeout(() => {
        clearInterval(pollInterval);
        setIsPollingEligibility(false);
        console.log("Stopped polling for eligibility status (timeout)");
      }, 300000); // 5 minutes

      return () => {
        clearInterval(pollInterval);
        clearTimeout(timeoutId);
        setIsPollingEligibility(false);
      };
    }
  }, [hasCompletedAllTasks, eligibilityStatus, accessToken, client]);

  const handleResetTasks = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all your completed tasks? This action cannot be undone and will allow you to retake all tests."
    );

    if (confirmed) {
      setIsResetting(true);
      try {
        await resetDoneTask({
          variables: { id: user.id },
        });
      } catch (error) {
        setIsResetting(false);
        console.error("Error resetting tasks:", error);
      }
    }
  };

  const getEligibilityStyle = () => {
    const currentStatus = eligibilityStatus ?? user?.isEligible;

    if (currentStatus === true) {
      return {
        cardClass:
          "bg-gradient-to-r from-purple-300 to-purple-500 text-white border-purple-600",
        text: "Eligible ✅",
        icon: <CheckCircle className="h-8 w-8 text-green-400" />,
      };
    } else if (currentStatus === false) {
      return {
        cardClass:
          "bg-gradient-to-r from-pink-300 to-pink-500 text-white border-pink-600",
        text: "Not Eligible ❌",
        icon: <XCircle className="h-8 w-8 text-red-400" />,
      };
    } else {
      // Handle pending state with more detailed info
      const message = hasCompletedAllTasks
        ? isPollingEligibility
          ? "Evaluation in Progress... 🔄"
          : "Pending Evaluation ⏳"
        : "Pending Evaluation ⏳";

      return {
        cardClass:
          "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white border-yellow-600",
        text: message,
        icon: isPollingEligibility ? (
          <RefreshCw className="h-8 w-8 text-yellow-400 animate-spin" />
        ) : (
          <HelpCircle className="h-8 w-8 text-yellow-400" />
        ),
      };
    }
  };

  if (tasksLoading || usersLoading)
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="ml-3 text-white">Loading dashboard data...</p>
      </div>
    );

  if (tasksError || usersError)
    return (
      <div className="bg-red-800/30 p-6 rounded-lg text-center">
        <p className="text-red-300 mb-2">Error loading dashboard</p>
        <p className="text-sm text-red-200">
          {tasksError?.message || usersError?.message}
        </p>
      </div>
    );

  const eligibilityStyle = getEligibilityStyle();

  return (
    <div className="space-y-8">
      {/* Enhanced Eligibility Card */}
      <div className="bg-white/10 p-6 rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          {eligibilityStyle.icon}
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">
          Your Eligibility Status
        </h2>

        <div className="flex items-center">
          <div className="p-3 rounded-full bg-white/10">
            {eligibilityStyle.icon}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-2xl font-bold">{eligibilityStyle.text}</p>
            <p className="text-gray-300 mt-1">
              {eligibilityStatus === true && "You can access all UAT resources"}
              {eligibilityStatus === false &&
                "Complete more tasks to become eligible"}
              {eligibilityStatus === null &&
                hasCompletedAllTasks &&
                isPollingEligibility &&
                "Calculating your accuracy using M-X algorithm..."}
              {eligibilityStatus === null &&
                hasCompletedAllTasks &&
                !isPollingEligibility &&
                "Waiting for enough workers to complete all tasks for evaluation"}
              {eligibilityStatus === null &&
                !hasCompletedAllTasks &&
                `Complete ${totalTasks - completedTasksCount} more task${
                  totalTasks - completedTasksCount > 1 ? "s" : ""
                } to be evaluated`}
            </p>
            {lastEligibilityCheck && isPollingEligibility && (
              <p className="text-xs text-gray-400 mt-1">
                Last checked: {lastEligibilityCheck.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Task Completion Progress */}
        <div className="mt-4 bg-white/5 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Task Progress</span>
            <span className="text-sm text-white font-semibold">
              {completedTasksCount}/{totalTasks}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                hasCompletedAllTasks ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min(
                  100,
                  (completedTasksCount / totalTasks) * 100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Special cases handling */}
        {eligibilityStatus === false && completedTasksCount > 0 && (
          <div className="mt-6 bg-red-800/30 p-4 rounded-lg border border-red-600/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  <h3 className="text-red-300 font-semibold">
                    Not Eligible for UAT Access
                  </h3>
                </div>
                <p className="text-red-200 text-sm mb-3">
                  Your current performance doesn&apos;t meet the eligibility
                  threshold. You can reset your completed tasks and retake all
                  tests to improve your accuracy score.
                </p>
                <p className="text-red-100 text-xs">
                  Completed Tasks: {completedTasksCount} | This will reset all
                  your progress and allow you to start fresh.
                </p>
              </div>
              <button
                onClick={handleResetTasks}
                disabled={isResetting}
                className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isResetting
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
                }`}
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Reset Tasks
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {eligibilityStatus === null && hasCompletedAllTasks && (
          <div className="mt-6 bg-blue-800/30 p-4 rounded-lg border border-blue-600/30">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-blue-300 font-semibold">
                Evaluation in Progress
              </h3>
            </div>
            <p className="text-blue-200 text-sm">
              You&apos;ve completed all {totalTasks} tasks! Our M-X algorithm is
              calculating your accuracy. This requires at least 3 workers to
              complete all tasks before evaluation can begin.
            </p>
            {isPollingEligibility && (
              <p className="text-blue-100 text-xs mt-2">
                🔄 Checking for updates every 10 seconds...
              </p>
            )}
          </div>
        )}

        {eligibilityStatus === null && !hasCompletedAllTasks && (
          <div className="mt-6 bg-yellow-800/30 p-3 rounded-lg text-sm">
            <p className="text-yellow-300 flex items-center">
              <BellRing className="w-4 h-4 mr-2" />
              Complete {totalTasks - completedTasksCount} more task
              {totalTasks - completedTasksCount > 1 ? "s" : ""} to be eligible
              for evaluation!
            </p>
          </div>
        )}
      </div>

      {/* UAT Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`rounded-lg overflow-hidden relative shadow-lg transition-all duration-300 transform hover:scale-105 ${
            eligibilityStatus === true
              ? "cursor-pointer"
              : "opacity-60 cursor-not-allowed grayscale"
          }`}
        >
          {eligibilityStatus === true ? (
            <Link
              href="https://ta-frontend-liart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-900 text-white h-full">
                <div className="absolute top-3 right-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    UAT Reporting Dashboard
                  </h3>
                  <p className="text-blue-200 mb-4">
                    Access comprehensive analytics and reporting tools for the
                    user acceptance testing process
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-sm text-blue-200">
                      <BarChart4 className="w-4 h-4 mr-1" />
                      <span>Dashboard & Analytics</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-full">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-white h-full p-6">
              <div className="absolute top-3 right-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center">
                UAT Reporting Dashboard
                <span className="ml-2 bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
                  Locked
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                Access comprehensive analytics and reporting tools for the user
                acceptance testing process
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-sm text-gray-400">
                  <BarChart4 className="w-4 h-4 mr-1" />
                  <span>Become eligible to access</span>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Second UAT Resource Card */}
        <div
          className={`rounded-lg overflow-hidden relative shadow-lg transition-all duration-300 transform hover:scale-105 ${
            eligibilityStatus === true
              ? "cursor-pointer"
              : "opacity-60 cursor-not-allowed grayscale"
          }`}
        >
          {eligibilityStatus === true ? (
            <Link
              href="https://uat-platform.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-900 text-white h-full">
                <div className="absolute top-3 right-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    UAT Testing Platform
                  </h3>
                  <p className="text-purple-200 mb-4">
                    Access the main testing platform to conduct user acceptance
                    tests on new features
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-sm text-purple-200">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Test & Document</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-full">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-900/50 text-white h-full p-6">
              <div className="absolute top-3 right-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center">
                UAT Testing Platform
                <span className="ml-2 bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
                  Locked
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                Access the main testing platform to conduct user acceptance
                tests on new features
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Become eligible to access</span>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Statistics */}
      <div className="bg-white/10 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Tasks Completed</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {completedTasksCount}
                </p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full h-2 bg-white/10 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    hasCompletedAllTasks ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (completedTasksCount / totalTasks) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {Math.round((completedTasksCount / totalTasks) * 100)}% of all
                tasks
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Available Tasks</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {totalTasks}
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-full">
                <BarChart4 className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/eval"
                className="text-purple-300 text-sm flex items-center hover:underline"
              >
                View available tasks
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Active Testers</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {totalActiveUsers}
                </p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-full">
                <UsersIcon className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/test-result"
                className="text-green-300 text-sm flex items-center hover:underline"
              >
                View your results
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          What to Do Next
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/eval"
            className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all flex items-start"
          >
            <div className="p-2 bg-blue-900/50 rounded-lg mr-3">
              <CheckCircle className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-medium text-white">
                {hasCompletedAllTasks ? "Review Tasks" : "Complete Tasks"}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {hasCompletedAllTasks
                  ? "Review your completed tasks or start over if needed"
                  : "Work on available tasks to improve your eligibility status"}
              </p>
            </div>
          </Link>

          <Link
            href="/test-result"
            className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all flex items-start"
          >
            <div className="p-2 bg-purple-900/50 rounded-lg mr-3">
              <BarChart4 className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-medium text-white">Check Results</h3>
              <p className="text-sm text-gray-300 mt-1">
                Review your past submissions and accuracy metrics
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
