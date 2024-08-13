import { NavigationOutlet } from "@services/ui";
import { Cryptogram } from "../Cryptogram";
import type { RouteObject } from "@services/navigation";

export const useCryptogramRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/cryptogram", element: <Cryptogram /> }],
    },
  ] as const satisfies RouteObject[];
};
