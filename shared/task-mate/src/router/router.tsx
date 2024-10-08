import type { RouteObject } from "@services/navigation";
import { NavigationOutlet, NoLayoutOutlet } from "@services/ui";
import { TaskListScreen } from "../screens/TaskListScreen";
import { CreateTaskScreen } from "../screens/CreateTaskScreen";
import { EditTaskScreen } from "../screens/EditTaskScreen";

export const useTaskMateRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/task-list", element: <TaskListScreen /> }],
    },
    {
      element: <NoLayoutOutlet />,
      children: [
        { path: "/task/create", element: <CreateTaskScreen /> },
        { path: "/task/edit/:taskId", element: <EditTaskScreen /> },
      ],
    },
  ] as const satisfies RouteObject[];
};
