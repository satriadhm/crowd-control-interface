import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <Link
        href="/eval"
        className="px-4 py-2 flex items-center gap-2 bg-[#001333] text-white rounded shadow"
      >
        Go to Test Page
      </Link>
    </div>
  );
}
