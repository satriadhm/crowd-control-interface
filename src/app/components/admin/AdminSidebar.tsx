// File: src/components/admin/Sidebar.tsx
"use client";

import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk Client Component

export default function Sidebar() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push(`${path}?creds=${token}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-64 min-h-screen p-6 shadow-lg">
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
  );
}
