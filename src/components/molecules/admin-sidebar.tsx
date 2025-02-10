"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/auth";
import { Users, ListChecks, LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next/client";

export default function Sidebar() {
  const router = useRouter();
  const [logoutMutation, { loading }] = useMutation(LOGOUT);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <aside className="bg-gradient-to-r from-[#5b0ba1] to-transparent text-white w-64 min-h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-200">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigateTo("/user-management")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <Users size={20} />
                <span>User Management</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/task-management")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <ListChecks size={20} />
                <span>Task Management</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-10">
        <button
          onClick={handleLogout}
          className={`w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700 text-white"
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
