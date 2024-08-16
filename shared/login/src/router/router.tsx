import type { RouteObject } from "@services/navigation";
import { NavigationOutlet, UnauthenticatedOutlet } from "@services/ui";
import { LoginScreen } from "../screens/LoginScreen";
import { EditAuthUserScreen } from "../screens/EditAuthUserScreen";

export const useLoginRouter = () => {
  return [
    {
      element: <UnauthenticatedOutlet />,
      children: [{ path: "/login", element: <LoginScreen /> }],
    },
    {
      element: <NavigationOutlet />,
      children: [{ path: "/user-edit", element: <EditAuthUserScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
