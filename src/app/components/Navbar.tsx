import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="font-bold text-xl">
        Crowdsourcing
      </Link>
      <div className="flex gap-4">
        <Link href="/features" className="hover:text-blue-400">
          Features
        </Link>
        <Link href="/register" className="hover:text-blue-400">
          Register
        </Link>
        <Link href="/login" className="hover:text-blue-400">
          Login
        </Link>
      </div>
    </nav>
  );
}
