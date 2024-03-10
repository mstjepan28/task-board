import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { Sudoku } from "../Sudoku";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const sudoku = createRoute({
    getParentRoute: () => rootRoute,
    path: "/sudoku",
    component: Sudoku,
  });

  return [sudoku];
};
