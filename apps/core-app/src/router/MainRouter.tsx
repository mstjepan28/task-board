import { BrickBreaker } from "@shared/brick-breaker";
import { Dashboard } from "../screens/Dashboard";
import { Cryptogram } from "@shared/cryptogram";
import { TaskBoardScreen } from "@shared/task-board";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Chat } from "@shared/live-chat";
import { Sudoku } from "@shared/sudoku";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: Dashboard });

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
