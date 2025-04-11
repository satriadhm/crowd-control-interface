"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/auth";
import Cookies from "js-cookie";
import { Users, ListChecks, LogOut, User, BarChart2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const [logoutMutation, { loading }] = useMutation(LOGOUT);
  const pathname = usePathname();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      clearAuth();
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const isActive = (path: string) => path.includes(pathname);

  return (
    <aside className="bg-[#001333] h-screen text-white col-span-2 flex flex-col justify-between shadow-xl overflow-hidden">
      <div>
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-200 p-4 mt-4">
          Admin Panel
        </h2>
        <nav className="p-2">
          <ul className="space-y-2">
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/user-management")
                  ? "border  bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/user-management")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <Users size={20} />
                <span>User Management</span>
              </button>
            </li>
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/task-management")
                  ? "border bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/task-management")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <ListChecks size={20} />
                <span>Task Management</span>
              </button>
            </li>
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/test-results")
                  ? "border bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/test-results")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <BarChart2 size={20} />
                <span>Test Results</span>
              </button>
            </li>
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/worker-analysis")
                  ? "border bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/worker-analysis")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <User size={20} />
                <span>Worker Analysis</span>
              </button>
            </li>
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/edit-profile")
                  ? "border bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/edit-profile")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <User size={20} />
                <span>Edit Profile</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="pb-4 px-2">
        <button
          onClick={handleLogout}
          className={`w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#0a1e5e] hover:bg-[#0a1e5e]/25 text-white"
          }`}
          disabled={loading}
        >
          <LogOut size={20} />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
