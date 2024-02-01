import { RouterProvider } from "@tanstack/react-router";
import { createMainRouter } from "./router/MainRouter";

const router = createMainRouter();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return <RouterProvider router={router} />;
};
