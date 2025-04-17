"use client";

import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileTestHistory from "@/components/molecules/admin/profile-test-history";

export default function ProfilePage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  return (
    <div className="flex min-h-screen">
      <WorkerSidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
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
      </main>
    </div>
  );
}
