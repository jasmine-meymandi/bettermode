import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ApolloProvider } from "@apollo/client/react";
import { getDataFromTree } from "@apollo/client/react/ssr";
import App from "./App";
import "./index.css";
import client from "./utils/apolloClient";
import { AuthProvider } from "./utils/auth-context";

export async function render(url: string, authToken?: string) {
  const AppTree = (
    <StrictMode>
      <ApolloProvider client={client}>
        <StaticRouter location={url}>
          <AuthProvider token={authToken}>
            <App />
          </AuthProvider>
        </StaticRouter>
      </ApolloProvider>
    </StrictMode>
  );

  try {
    await getDataFromTree(AppTree);
  } catch (err) {
    console.error("SSR: Error during getDataFromTree:", err);
  }

  const content = renderToString(AppTree);

  const initialState = client.extract();
  return {
    html: content,
    state: initialState,
  };
}
