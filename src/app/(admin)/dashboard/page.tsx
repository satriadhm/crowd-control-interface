import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <Link
        href="/eval"
        className="px-6 py-3 text-white rounded-md bg-gradient-to-r from-[#5b0ba1] to-transparent transition"
      >
        Go to Test Page
      </Link>
    </div>
  );
}
