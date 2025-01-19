import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 font-bold text-xl">Admin Panel</div>
      <nav className="flex-1">
        <Link href="/admin/user-management">
          <a className="block px-4 py-2 hover:bg-gray-700">User Management</a>
        </Link>
        <Link href="/admin/task-management">
          <a className="block px-4 py-2 hover:bg-gray-700">Task Management</a>
        </Link>
      </nav>
    </div>
  );
}
