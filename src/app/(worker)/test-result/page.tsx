"use client";

import { useQuery } from "@apollo/client";
import WorkerSidebar from "@/components/molecules/worker-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";

export default function TestResultsPage() {
  const {
    data: userData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  // get the user data, 
}
