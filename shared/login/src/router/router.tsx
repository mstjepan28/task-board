import type { RouteObject } from "@services/navigation";
import { UnauthenticatedOutlet } from "@services/ui";
import { LoginScreen } from "../screens/LoginScreen";

export const useLoginRouter = () => {
  return [
    {
      element: <UnauthenticatedOutlet />,
      children: [{ path: "/login", element: <LoginScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
