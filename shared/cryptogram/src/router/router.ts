import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { Cryptogram } from "../Cryptogram";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const cryptogram = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cryptogram",
    component: Cryptogram,
  });

  return [cryptogram];
};
