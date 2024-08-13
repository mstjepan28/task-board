import type { RouteObject } from "@services/navigation";
import { NavigationOutlet } from "@services/ui";
import { Sudoku } from "../Sudoku";

export const useSudokuRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [{ path: "/sudoku", element: <Sudoku /> }],
    },
  ] as const satisfies RouteObject[];
};
