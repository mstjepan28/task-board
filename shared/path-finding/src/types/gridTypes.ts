import type { TDirection } from "../enums/directions";

export type TGridCell = {
  x: number;
  y: number;
  direction: TDirection | null;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
};
