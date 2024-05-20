import type { TGridCell } from "../types/gridTypes";

export const generateGrid = (sizeX: number, sizeY: number): TGridCell[] => {
  if (sizeX < 0 || sizeY < 0 || sizeX > 100 || sizeY > 100) {
    throw new Error("Invalid grid size");
  }

  const grid: TGridCell[] = [];
  let cellCounter = 0;

  for (let row = 0; row < sizeX; row++) {
    for (let col = 0; col < sizeY; col++) {
      cellCounter++;

      const newCell = {
        id: cellCounter,
        fValue: 0,
        gValue: 0,
        hValue: 0,
        isOnClosedList: false,
        isOnOpenList: true,
        isWalkable: true,
        parentNode: undefined,
        position: {
          x: row,
          y: col,
        },
      } satisfies TGridCell;

      grid.push(newCell);
    }
  }

  return grid;
};
