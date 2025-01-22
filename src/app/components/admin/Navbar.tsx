import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        Crowd Control
      </Link>
      <div className="flex gap-4">
        <Link href="/admin/task-management" className="hover:text-primary">
          Tasks
        </Link>
        <Link href="/admin/user-management" className="hover:text-primary">
          Users
        </Link>
      </div>
    </nav>
  );
}
