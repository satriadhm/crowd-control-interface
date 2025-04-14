"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { GET_TOTAL_TASKS } from "@/graphql/queries/tasks";
import { GET_TOTAL_USERS } from "@/graphql/queries/users";
import DashboardCharts from "@/components/organism/charts";

export default function Dashboard() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  // Query untuk mendapatkan data user yang sedang login
  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  // Query untuk mendapatkan total tasks
  const { data: tasksData, loading: tasksLoading, error: tasksError } = useQuery(GET_TOTAL_TASKS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  
  // Query untuk mendapatkan total active user
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_TOTAL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  if (loading)
    return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Pastikan data dashboard untuk tasks dan users sudah ada
  if (tasksLoading || usersLoading)
    return <p className="text-center text-gray-500">Loading dashboard data...</p>;
  if (tasksError)
    return <p className="text-center text-red-500">Error: {tasksError.message}</p>;
  if (usersError)
    return <p className="text-center text-red-500">Error: {usersError.message}</p>;

  const user = data?.me;

  const totalTasks = tasksData?.getTotalTasks || 0;
  const totalActiveUsers = usersData?.getTotalUsers || 0;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
      {/* Fixed Sidebar */}
      <div className="flex-none">
        <WorkerSidebar />
      </div>
      
      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center bg-white/10 p-4 rounded-lg shadow-md mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-gray-300">
              Welcome,{" "}
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/eval")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Go to Eval
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white">Total Tasks</h2>
            <p className="text-4xl font-bold text-blue-400 mt-2">{totalTasks}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white">Total Active User</h2>
            <p className="text-4xl font-bold text-orange-400 mt-2">{totalActiveUsers}</p>
          </div>
        </div>

        {/* Dashboard Charts */}
        <div className="pb-8">
          <DashboardCharts />
        </div>
      </main>
    </div>
  );
}