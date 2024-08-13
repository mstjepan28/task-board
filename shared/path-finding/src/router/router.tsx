import { PathFinderScreen } from "../screen/PathFinderScreen";
import type { RouteObject } from "@services/navigation";
import { NavigationOutlet } from "@services/ui";

export const usePathFinderRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/path-finder", element: <PathFinderScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
