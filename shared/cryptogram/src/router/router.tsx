import { NoLayoutOutlet } from "@services/ui";
import { Cryptogram } from "../Cryptogram";
import type { RouteObject } from "@services/navigation";

export const useCryptogramRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [{ path: "/cryptogram", element: <Cryptogram /> }],
    },
  ] as const satisfies RouteObject[];
};
