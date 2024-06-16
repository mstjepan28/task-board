import type { AnyRoute } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import { NumberGuesserScreen } from "../screen/NumberGuesserScreen";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const sudoku = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    // path: "/number-guesser",
    component: NumberGuesserScreen,
  });

  return [sudoku];
};
