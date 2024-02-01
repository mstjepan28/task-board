import { Outlet, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Dashboard } from "../screens/Dashboard";
import { TaskBoardScreen } from "@shared/task-board";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: Outlet });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
  });

  const taskBoard = createRoute({
    getParentRoute: () => indexRoute,
    path: "/task-board",
    component: TaskBoardScreen,
  });

  const routeTree = rootRoute.addChildren([indexRoute, taskBoard]);
  return createRouter({ routeTree });
};
