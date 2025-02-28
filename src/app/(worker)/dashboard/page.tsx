"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import Sidebar from "@/components/molecules/admin-sidebar";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import DashboardCharts from "@/components/molecules/charts";

export default function Dashboard() {
  const { accessToken, userRole, clearAuth } = useAuthStore();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("User data fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  if (loading) return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const user = data?.me;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white overflow-hidden">
      {userRole === "admin" && <Sidebar />}
      <main className="flex-1 p-6">
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
              onClick={() => router.push("/dashboard/edit-profile")}
              className="px-4 py-2 bg-gradient-to-r from-tertiary to-tertiary-light text-white rounded-lg shadow hover:bg-secondary"
            >
              Edit Profile
            </button>
            <button
              onClick={() => router.push("/eval")}
              className="px-4 py-2 bg-gradient-to-r from-tertiary to-tertiary-light text-white rounded-lg shadow hover:bg-secondary"
            >
              Go to Eval
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white">Total Tasks</h2>
            <p className="text-4xl font-bold text-blue-400 mt-2">24</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white">Completed Tasks</h2>
            <p className="text-4xl font-bold text-green-400 mt-2">18</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white">Pending Tasks</h2>
            <p className="text-4xl font-bold text-orange-400 mt-2">6</p>
          </div>
        </div>

        <DashboardCharts />
      </main>
    </div>
  );
}