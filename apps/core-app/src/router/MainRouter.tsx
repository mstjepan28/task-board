import { BoidsSimulations } from "@shared/boids-simulation";
import { BrickBreaker } from "@shared/brick-breaker";
import { Cryptogram } from "@shared/cryptogram";
import { Chat } from "@shared/live-chat";
import { Sudoku } from "@shared/sudoku";
import { createModuleRouter } from "@shared/todo-app";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { NavigationLayout } from "../layout/NavigationLayout";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: NavigationLayout });
  const todoRouter = createModuleRouter<typeof rootRoute>(rootRoute);

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <></>,
  });

  const brickBreaker = createRoute({
    getParentRoute: () => rootRoute,
    path: "/brick-breaker",
    component: BrickBreaker,
  });

  const cryptogram = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cryptogram",
    component: Cryptogram,
  });

  const sudoku = createRoute({
    getParentRoute: () => rootRoute,
    path: "/sudoku",
    component: Sudoku,
  });

  const liveChat = createRoute({
    getParentRoute: () => rootRoute,
    path: "/live-chat",
    component: Chat,
  });

  const chess = createRoute({
    getParentRoute: () => rootRoute,
    path: "/boids",
    component: BoidsSimulations,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    ...todoRouter,
    brickBreaker,
    cryptogram,
    sudoku,
    liveChat,
    chess,
  ]);
  return createRouter({ routeTree });
};
