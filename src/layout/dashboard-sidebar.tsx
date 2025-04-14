import Link from 'next/link';

export default function DashboardSidebar() {
  return (
    <div className="w-64 bg-gradient-to-r from-purple-700 to-blue-500 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">User Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="hover:text-blue-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/edit-profile" className="hover:text-blue-300">
              Edit Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
