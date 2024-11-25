import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    authorization: import.meta.env.VITE_GRAPHQL_AUTHORIZATION,
  },
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // true on server, false on client
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
