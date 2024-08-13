import { NavigationOutlet } from "@services/ui";
import type { RouteObject } from "@services/navigation";
import { NumberGuesserScreen } from "../screen/NumberGuesserScreen";

export const useNumberGuesserRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/number-guess", element: <NumberGuesserScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
