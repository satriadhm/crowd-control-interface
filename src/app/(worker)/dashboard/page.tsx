"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import DashboardStats from "@/components/molecules/worker/dashboard-stat";

export default function Dashboard() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  // Query to get current logged in user data
  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="ml-4">Loading user data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <div className="bg-red-800/30 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-300">{error.message}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    );

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
            <h1 className="text-2xl font-bold text-white">
              Welcome to Worker Selection Dashboard
            </h1>
            <p className="text-sm text-gray-300">
              Hello,{" "}
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
              Take Tests
            </button>
          </div>
        </div>

        {/* Dashboard Stats with UAT Cards - User Friendly Version */}
        <DashboardStats user={user} accessToken={accessToken} />
      </main>
    </div>
  );
}
