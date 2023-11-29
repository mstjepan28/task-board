import { Sudoku } from "@shared/sudoku";

export const App = () => {
  return (
    <div className="h-[100svh] w-full flex items-center justify-center bg-gray-500">
      <Sudoku />
    </div>
  );
};
