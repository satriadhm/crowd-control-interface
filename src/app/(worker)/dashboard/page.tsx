"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import DashboardCharts from "@/components/organism/charts";
import DashboardStats from "@/components/molecules/worker/dashboard-stat";

export default function Dashboard() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  // Query untuk mendapatkan data user yang sedang login
  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  if (loading)
    return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const user = data?.me;

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

        {/* Dashboard Stats with UAT Cards */}
        <DashboardStats user={user} accessToken={accessToken} />

        {/* Dashboard Charts */}
        <div className="mt-6 pb-8">
          <DashboardCharts />
        </div>
      </main>
    </div>
  );
}
