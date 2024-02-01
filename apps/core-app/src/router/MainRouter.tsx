import { BrickBreaker } from "@shared/brick-breaker";
import { TaskBoardScreen } from "@shared/task-board";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Dashboard } from "../screens/Dashboard";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: Dashboard });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
  });

  const taskBoard = createRoute({
    getParentRoute: () => rootRoute,
    path: "/task-board",
    component: TaskBoardScreen,
  });

  const brickBreaker = createRoute({
    getParentRoute: () => rootRoute,
    path: "/brick-breaker",
    component: BrickBreaker,
  });

  const routeTree = rootRoute.addChildren([indexRoute, taskBoard, brickBreaker]);
  return createRouter({ routeTree });
};
