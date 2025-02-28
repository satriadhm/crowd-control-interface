"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import Sidebar from "@/components/molecules/admin-sidebar";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";

export default function Dashboard() {
  const { accessToken, userRole, clearAuth } = useAuthStore();
  const router = useRouter();

  // Fetch User Data from GraphQL
  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken }, 
    fetchPolicy: "network-only",
  });

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  // Handle Loading State
  if (loading)
    return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Get user data from response
  const user = data?.me;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar hanya untuk admin */}
      {userRole === "admin" && <Sidebar />}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
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

        {/* User Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Username:</strong> {user?.userName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-lg ${
                  user?.role === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {user?.role || "N/A"}
              </span>
            </p>
            <p>
              <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {user?.address1 || "N/A"},{" "}
              {user?.address2 || "N/A"}
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">Total Tasks</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">24</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Completed Tasks
            </h2>
            <p className="text-4xl font-bold text-green-600 mt-2">18</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Tasks
            </h2>
            <p className="text-4xl font-bold text-orange-600 mt-2">6</p>
          </div>
        </div>

        {/* Navigation Links
        <div className="mt-8 flex gap-4">
          <a
            href="/eval"
            className="px-4 py-2 flex items-center gap-2 bg-[#001333] text-white rounded-lg shadow hover:bg-[#032054]"
          >
            Go to Test Page
          </a>
          <a
            href="/reports"
            className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            View Reports
          </a>
          <a
            href="/tasks"
            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Manage Tasks
          </a>
        </div> */}
      </main>
    </div>
  );
}
