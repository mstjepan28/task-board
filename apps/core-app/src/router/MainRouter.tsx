import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { NavigationLayout } from "../layout/NavigationLayout";
import * as todoModule from "@shared/todo-app";
import * as sudokuModule from "@shared/sudoku";
import * as chatModule from "@shared/live-chat";
import * as cryptogramModule from "@shared/cryptogram";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: NavigationLayout });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <></>,
  });

  const todoRouter = todoModule.createModuleRouter<typeof rootRoute>(rootRoute);
  const sudokuRouter = sudokuModule.createModuleRouter<typeof rootRoute>(rootRoute);
  const chatRouter = chatModule.createModuleRouter<typeof rootRoute>(rootRoute);
  const cryptogramRouter = cryptogramModule.createModuleRouter<typeof rootRoute>(rootRoute);

  const routerGroup = [indexRoute, todoRouter, sudokuRouter, chatRouter, cryptogramRouter].flat();
  return createRouter({ routeTree: rootRoute.addChildren(routerGroup) });
};
