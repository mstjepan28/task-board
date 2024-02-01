import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createMainRouter } from "./router/MainRouter";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No root element found");
}

const router = createMainRouter();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
