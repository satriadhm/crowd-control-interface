'use client';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <Link href="/eval">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Go to Test Page
                </button>
            </Link>
        </div>
    );
}