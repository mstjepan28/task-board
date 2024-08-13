import type { RouteObject } from "@services/navigation";
import { NoLayoutOutlet } from "@services/ui";
import { Sudoku } from "../Sudoku";

export const useSudokuRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [{ path: "/sudoku", element: <Sudoku /> }],
    },
  ] as const satisfies RouteObject[];
};
