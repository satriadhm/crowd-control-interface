"use client";

import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileTestHistory from "@/components/molecules/admin/profile-test-history";
import { Suspense, useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  // Only run the query on the client side after initial mount
  useEffect(() => {
    setInitialized(true);
  }, []);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken || !initialized,
    fetchPolicy: "network-only",
  });

  // Render function that handles all states safely
  const renderContent = () => {
    if (!initialized) {
      return <p className="text-center text-gray-300">Initializing...</p>;
    }

    if (userLoading) {
      return <p className="text-center text-gray-300">Loading user data...</p>;
    }

    if (userError) {
      return (
        <div className="text-center text-red-400">
          <p>Error loading user data: {userError.message}</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      );
    }

    // Make sure userData and userData.me exist before using them
    if (!userData || !userData.me) {
      return (
        <div className="text-center text-amber-400">
          <p>User data not available. Please try logging in again.</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Go to Login
          </Button>
        </div>
      );
    }

    // If we have valid user data, render the profile
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Profile & Test History</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p>
            Name: {userData.me.firstName} {userData.me.lastName}
          </p>
          <p>Email: {userData.me.email}</p>
        </section>

        <ProfileTestHistory />

        <Button onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </>
    );
  };

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <Suspense
          fallback={<p className="text-center text-gray-300">Loading...</p>}
        >
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
}
