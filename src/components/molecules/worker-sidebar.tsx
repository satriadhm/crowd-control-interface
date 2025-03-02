"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/auth";
import { User, LogOut, ClipboardList } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function WorkerSidebar() {
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
      clearAuth();
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Gunakan style yang sama dengan admin sidebar
  const isActive = (path: string) => pathname.includes(path);

  return (
    <aside className="bg-[#001333] h-screen text-white col-span-2 flex flex-col justify-between shadow-xl overflow-hidden">
      <div>
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-200 p-4 mt-4">
          Worker Panel
        </h2>
        <nav className="p-2">
          <ul className="space-y-2">
            {/* Menu Edit Profile */}
            <li
              className={`text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/dashboard/edit-profile")
                  ? "border bg-[#5460ff] to-[#032054]"
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/dashboard/edit-profile")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <User size={20} />
                <span>Edit Profile</span>
              </button>
            </li>
            {/* Menu Test Results */}
            <li
              className={`text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/test-results")
                  ? "border bg-[#5460ff] to-[#032054]"
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/test-results")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <ClipboardList size={20} />
                <span>Test Results</span>
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
