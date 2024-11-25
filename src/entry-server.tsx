import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ApolloProvider } from "@apollo/client/react";
import { getDataFromTree } from "@apollo/client/react/ssr";
import App from "./App";
import "./index.css";
import client from "./utils/apolloClient";
export async function render(url: string) {
  const AppTree = (
    <StrictMode>
      <ApolloProvider client={client}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </StrictMode>
  );

  // Wait for all GraphQL data to be fetched
  await getDataFromTree(AppTree);

  const content = renderToString(AppTree);

  // Extract the Apollo Client cache to pass to the client
  const initialState = client.extract();

  return {
    html: content,
    state: initialState,
  };
}
