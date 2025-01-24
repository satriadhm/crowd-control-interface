"use client";

export default function Dashboard() {
  const navigateTo = (path: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = `${path}?creds=${token}`;
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
    <button
      onClick={() => navigateTo("/eval")}
      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Go to Test Page
    </button>
    </div>
  );
}
