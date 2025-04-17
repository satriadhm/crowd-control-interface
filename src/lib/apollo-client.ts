// src/lib/apollo-client.ts
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "@/store/authStore";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Check if we're in a browser environment before accessing store
  const accessToken =
    typeof window !== "undefined" ? useAuthStore.getState().accessToken : null;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
