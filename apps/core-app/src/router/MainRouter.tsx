import { BrickBreaker } from "@shared/brick-breaker";
import { Cryptogram } from "@shared/cryptogram";
import { Chat } from "@shared/live-chat";
import { Sudoku } from "@shared/sudoku";
import { TaskBoardScreen } from "@shared/todo-app";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { NavigationLayout } from "../layout/NavigationLayout";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: NavigationLayout });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <></>,
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

  const routeTree = rootRoute.addChildren([indexRoute, taskBoard, brickBreaker, cryptogram, sudoku, liveChat]);
  return createRouter({ routeTree });
};
