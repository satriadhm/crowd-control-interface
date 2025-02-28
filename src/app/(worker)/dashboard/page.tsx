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
    <div className="flex min-h-screen bg-gray-100">
      {userRole === "admin" && <Sidebar />}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome,{" "}
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">Total Tasks</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">Completed Tasks</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">18</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
            <p className="text-4xl font-bold text-orange-600 mt-2">6</p>
          </div>
        </div>

        <DashboardCharts />
      </main>
    </div>
  );
}