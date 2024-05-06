import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { PathFinderScreen } from "../screen/PathFinderScreen";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const sudoku = createRoute({
    getParentRoute: () => rootRoute,
    path: "/path-finder",
    component: PathFinderScreen,
  });

  return [sudoku];
};
