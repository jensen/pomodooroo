import React from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./Router";

import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("Must mount to 'root' element");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
