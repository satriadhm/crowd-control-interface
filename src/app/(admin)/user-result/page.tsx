// src/app/(admin)/user-results/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/molecules/admin-sidebar";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/queries/users";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    eligible: boolean;
}


export default function UserResultsPage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ALL_USERS, { fetchPolicy: "network-only" });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-[#0a1e5e] to-[#001333] text-white">
        <h1 className="text-2xl font-bold mb-4">User Results</h1>
        <Table>
          <TableCaption>A list of users and their eligibility status.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getAllUsers.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.eligible ? "Eligible" : "Not Eligible"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => router.push("/task-management")} className="mt-6">
          Back to Task Management
        </Button>
      </main>
    </div>
  );
}
