// src/components/admin/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-64 min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/user-management" className="hover:text-blue-300">
              User Management
            </Link>
          </li>
          <li>
            <Link href="/admin/task-management" className="hover:text-blue-300">
              Task Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
