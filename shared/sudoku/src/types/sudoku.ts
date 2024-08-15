import type { TDifficulty } from "../enums/Difficulty";

export type TBoard = number[][];

export type TSaveGame = {
  board: TBoard;
  solution: TBoard;
  initBoard: TBoard;
  difficulty: TDifficulty;
};
