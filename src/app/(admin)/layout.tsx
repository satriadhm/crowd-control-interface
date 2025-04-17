"use client";

import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/molecules/admin/admin-sidebar";

export default function AdminLayout({ children }) {
  const { userRole } = useAuthStore();

  return (
    <div className="flex min-h-screen">
      {userRole === "admin" && <Sidebar />}
      <main className="flex-1 h-screen overflow-hidden bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}