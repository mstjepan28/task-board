import type { RouteObject } from "@services/navigation";
import { NavigationOutlet } from "@services/ui";
import { TaskListScreen } from "../screens/TaskListScreen";

export const useTaskMateRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [
        { path: "/tasks", element: <TaskListScreen /> },
        { path: "/tasks/create", element: <TaskListScreen /> },
        { path: "/tasks/edit/:taskId", element: <TaskListScreen /> },
      ],
    },
  ] as const satisfies RouteObject[];
};
