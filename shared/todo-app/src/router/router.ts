import { AnyRoute, createRoute } from "@tanstack/react-router";
import { TaskBoardScreen } from "../screens/TaskBoardScreen";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const taskBoard = createRoute({
    getParentRoute: () => rootRoute,
    path: "/task-board",
    component: TaskBoardScreen,
  });

  return [taskBoard];
};
