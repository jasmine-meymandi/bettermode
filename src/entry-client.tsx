import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NormalizedCacheObject } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";

const initialState: NormalizedCacheObject =
  (window as unknown as { __APOLLO_STATE__?: NormalizedCacheObject })
    .__APOLLO_STATE__ || {};
if (initialState) {
  client.cache.restore(initialState);
}
hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
