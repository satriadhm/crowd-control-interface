// src/components/molecules/worker/dashboard-stat.tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import { GET_TOTAL_USERS } from "@/graphql/queries/users";
import { User } from "@/graphql/types/users";
import Link from "next/link";

interface DashboardStatsProps {
  user: User;
  accessToken: string | null;
}

export default function DashboardStats({
  user,
  accessToken,
}: DashboardStatsProps) {
  // Query untuk mendapatkan total tasks
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

  // Query untuk mendapatkan total active user
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
      <p className="text-center text-gray-500">Loading dashboard data...</p>
    );
  if (tasksError)
    return (
      <p className="text-center text-red-500">Error: {tasksError.message}</p>
    );
  if (usersError)
    return (
      <p className="text-center text-red-500">Error: {usersError.message}</p>
    );

  const totalTasks = tasksData?.getTotalTasks || 0;
  const totalActiveUsers = usersData?.getTotalUsers || 0;

  return (
    <div className="space-y-6">
      {/* Eligibility status card */}
      <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold text-white">Your Eligibility</h2>
        <div className="text-center">
          <p className="text-4xl font-bold mt-2">
            {user?.isEligible === true && (
              <span className="text-green-400">Eligible</span>
            )}
            {user?.isEligible === false && (
              <span className="text-red-400">Not Eligible</span>
            )}
            {user?.isEligible === null && (
              <span className="text-yellow-400">Pending</span>
            )}
          </p>
          {user?.isEligible === null && (
            <p className="text-xs text-gray-300 mt-1">
              Complete more tasks for evaluation
            </p>
          )}
        </div>
      </div>

      {/* UAT access cards - only active when eligible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UAT Reporting Card */}
        <div
          className={`relative bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center h-48 ${
            user?.isEligible
              ? "hover:bg-white/20 transition-all cursor-pointer"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          {user?.isEligible ? (
            <Link
              href="https://ta-frontend-liart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                UAT Reporting
              </h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                Access the reporting dashboard for user acceptance testing
              </p>
            </Link>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 bg-gray-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                UAT Reporting
              </h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                Become eligible to access this resource
              </p>
            </div>
          )}
        </div>

        {/* Second UAT Card */}
        <div
          className={`relative bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center h-48 ${
            user?.isEligible
              ? "hover:bg-white/20 transition-all cursor-pointer"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          {user?.isEligible ? (
            <Link
              href="#" // Replace with actual URL when available
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">🧪</span>
              </div>
              <h3 className="text-xl font-semibold text-white">UAT Page</h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                Access the user acceptance testing page
              </p>
            </Link>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 bg-gray-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white">UAT Page</h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                Become eligible to access this resource
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info stats - moved to bottom of dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-white">Total Tasks</h2>
          <p className="text-4xl font-bold text-blue-400 mt-2">{totalTasks}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-white">
            Total Active Users
          </h2>
          <p className="text-4xl font-bold text-orange-400 mt-2">
            {totalActiveUsers}
          </p>
        </div>
      </div>
    </div>
  );
}
