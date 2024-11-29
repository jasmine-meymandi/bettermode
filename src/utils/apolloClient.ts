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
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["id"], // Use unique identifiers to differentiate posts
      },
      Query: {
        fields: {
          posts: {
            merge(existing = {}, incoming) {
              return incoming; // Always replace existing data
            },
          },
        },
      },
    },
  }),
});

export default client;
