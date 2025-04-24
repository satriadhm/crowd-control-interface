// src/components/molecules/worker/dashboard-stat.tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import { GET_TOTAL_USERS } from "@/graphql/queries/users";
import { User } from "@/graphql/types/users";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Globe,
  BookOpen,
  BarChart4,
  BellRing,
} from "lucide-react";

interface DashboardStatsProps {
  user: User;
  accessToken: string | null;
}

export default function DashboardStats({
  user,
  accessToken,
}: DashboardStatsProps) {
  // Query to get total tasks
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

  // Query to get total active users
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

  const totalTasks = tasksData?.getTotalTasks || 0;
  const totalActiveUsers = usersData?.getTotalUsers || 0;
  const completedTasksCount = user?.completedTasks?.length || 0;

  return (
    <div className="space-y-8">
      {/* Eligibility Card with Enhanced Visual */}
      <div className="bg-white/10 p-6 rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          {user?.isEligible === true && (
            <CheckCircle className="w-full h-full text-green-500" />
          )}
          {user?.isEligible === false && (
            <XCircle className="w-full h-full text-red-500" />
          )}
          {user?.isEligible === null && (
            <HelpCircle className="w-full h-full text-yellow-500" />
          )}
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">
          Your Eligibility Status
        </h2>

        <div className="flex items-center">
          <div className="p-3 rounded-full bg-white/10">
            {user?.isEligible === true && (
              <CheckCircle className="h-8 w-8 text-green-400" />
            )}
            {user?.isEligible === false && (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
            {user?.isEligible === null && (
              <HelpCircle className="h-8 w-8 text-yellow-400" />
            )}
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold">
              {user?.isEligible === true && (
                <span className="text-green-400">Eligible</span>
              )}
              {user?.isEligible === false && (
                <span className="text-red-400">Not Eligible</span>
              )}
              {user?.isEligible === null && (
                <span className="text-yellow-400">Pending Evaluation</span>
              )}
            </p>
            <p className="text-gray-300 mt-1">
              {user?.isEligible === true && "You can access all UAT resources"}
              {user?.isEligible === false &&
                "Complete more tasks to become eligible"}
              {user?.isEligible === null &&
                "Your status is being evaluated based on your task submissions"}
            </p>
          </div>
        </div>

        {user?.isEligible === null && (
          <div className="mt-6 bg-yellow-800/30 p-3 rounded-lg text-sm">
            <p className="text-yellow-300 flex items-center">
              <BellRing className="w-4 h-4 mr-2" />
              Complete more tasks to receive a full evaluation of your accuracy!
            </p>
          </div>
        )}

        {user?.isEligible === false && (
          <div className="mt-6 bg-blue-900/30 p-3 rounded-lg text-sm">
            <p className="text-blue-300 flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              <Link href="/eval" className="underline">
                Go to tasks
              </Link>{" "}
               and complete more to improve your eligibility!
            </p>
          </div>
        )}
      </div>

      {/* UAT Resources Cards - Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UAT Reporting Dashboard Card */}
        <div
          className={`rounded-lg overflow-hidden relative shadow-lg transition-all duration-300 transform hover:scale-105 ${
            user?.isEligible
              ? "cursor-pointer"
              : "opacity-60 cursor-not-allowed grayscale"
          }`}
        >
          {user?.isEligible ? (
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
            user?.isEligible
              ? "cursor-pointer"
              : "opacity-60 cursor-not-allowed grayscale"
          }`}
        >
          {user?.isEligible ? (
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

      {/* Your Progress Section */}
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
                  className="h-2 bg-blue-500 rounded-full"
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
                <Users className="h-6 w-6 text-green-400" />
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

      {/* What to Do Next section */}
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
              <h3 className="font-medium text-white">Complete Tasks</h3>
              <p className="text-sm text-gray-300 mt-1">
                Work on available tasks to improve your eligibility status
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

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}