import { PathFinderScreen } from "../screen/PathFinderScreen";
import type { RouteObject } from "@services/navigation";
import { NoLayoutOutlet } from "@services/ui";

export const usePathFinderRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [{ path: "/cryptogram", element: <PathFinderScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
