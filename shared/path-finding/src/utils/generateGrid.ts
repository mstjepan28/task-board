import type { TGridCell } from "../types/gridTypes";

export const generateGrid = (sizeX: number, sizeY: number): TGridCell[] => {
  if (sizeX < 0 || sizeY < 0 || sizeX > 100 || sizeY > 100) {
    throw new Error("Invalid grid size");
  }

  const grid: TGridCell[] = [];

  for (let row = 0; row < sizeX; row++) {
    for (let col = 0; col < sizeY; col++) {
      const newCell = {
        x: col + 1,
        y: row + 1,
        isWall: Math.random() < 0.3,
        isStart: false,
        isEnd: false,
        direction: null,
      } satisfies TGridCell;

      grid.push(newCell);
    }
  }

  return grid;
};
