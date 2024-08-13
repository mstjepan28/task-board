import type { RouteObject } from "@services/navigation";
import { NoLayoutOutlet } from "@services/ui";
import { TaskBoardScreen } from "../screens/TaskBoardScreen";

export const useTodoRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [{ path: "/task-board", element: <TaskBoardScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
