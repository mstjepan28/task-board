import { getSudoku } from "sudoku-gen";

type TDifficulty = Required<Parameters<typeof getSudoku>[0]>;

const splitStringIntoNParts = (str: string, n: number) => {
  const regex = new RegExp(`(.{1,${Math.ceil(str.length / n)}})`, "g");

  // @ts-ignore
  return str.match(regex).map((part) => {
    return part.split("").map((val) => {
      if (val === "-") {
        return -1;
      }

      return Number(val);
    });
  });
};

export const generateSudokuGame = (difficulty: TDifficulty) => {
  const game = getSudoku(difficulty);

  return {
    puzzle: splitStringIntoNParts(game.puzzle, 9),
    solution: splitStringIntoNParts(game.solution, 9),
  };
};
