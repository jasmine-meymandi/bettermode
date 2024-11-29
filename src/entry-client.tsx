import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NormalizedCacheObject } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";
import { AuthProvider } from "./utils/auth-context";
import Cookies from "js-cookie";

const initialState: NormalizedCacheObject =
  (window as unknown as { __APOLLO_STATE__?: NormalizedCacheObject })
    .__APOLLO_STATE__ || {};
if (initialState) {
  client.cache.restore(initialState);
}

// Retrieve the token from cookies
const token = Cookies.get("authToken");
hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider token={token}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
