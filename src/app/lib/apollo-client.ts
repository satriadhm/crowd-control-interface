import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Ganti dengan URL GraphQL Anda
  cache: new InMemoryCache(),
});

export default client;
