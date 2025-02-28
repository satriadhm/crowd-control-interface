"use client";

import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/molecules/admin-sidebar";

export default function AdminLayout({ children }) {
  const { userRole } = useAuthStore();

  return (
    <div className="grid grid-cols-12">
      {userRole === "admin" && <Sidebar />}
      <main className={`${userRole === "admin" ? "col-span-10" : "col-span-12"} bg-background p-6`}>
        {children}
      </main>
    </div>
  );
}
