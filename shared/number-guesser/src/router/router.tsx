import { NoLayoutOutlet } from "@services/ui";
import type { RouteObject } from "@services/navigation";
import { NumberGuesserScreen } from "../screen/NumberGuesserScreen";

export const useNumberGuesserRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [{ path: "/number-guess", element: <NumberGuesserScreen /> }],
    },
  ] as const satisfies RouteObject[];
};
