import type { RouteObject } from "@services/navigation";
import { NavigationOutlet } from "@services/ui";
import { TaskBoardScreen } from "../screens/TaskBoardScreen";

export const useTodoRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/task-board", element: <TaskBoardScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
