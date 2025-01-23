// File: src/components/admin/Sidebar.tsx
"use client";

import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk Client Component
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/app/graphql/mutations/auth"; // Import mutasi GraphQL Logout

export default function Sidebar() {
  const router = useRouter();
  const [logoutMutation, { loading }] = useMutation(LOGOUT);

  const navigateTo = (path: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push(`${path}?creds=${token}`);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      // Panggil mutasi GraphQL untuk logout
      await logoutMutation();

      // Hapus token dari localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect ke halaman login
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-64 min-h-screen p-6 shadow-lg flex flex-col justify-between">
      {/* Header dan Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigateTo("/admin/user-management")}
                className="hover:text-blue-300"
              >
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/admin/task-management")}
                className="hover:text-blue-300"
              >
                Task Management
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-10">
        <button
          onClick={handleLogout}
          className={`w-full py-3 mt-auto text-lg font-semibold rounded-full shadow-md transition-all duration-300 ${
            loading
              ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
