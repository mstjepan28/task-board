import { useEffect, useState } from "react";
import { GridCell } from "../components/GridCell";
import type { TGridCell } from "../types/gridTypes";
import { generateGrid } from "../utils/generateGrid";
import { loadState, saveState } from "../utils/saveLoadGame";

export const PathFinderScreen = () => {
  const [grid, setGrid] = useState<TGridCell[] | null>(null);

  const SIZE_X = 12;
  const SIZE_Y = 9;

  const onCellClick = (updatedCell: TGridCell) => {
    if (!grid) {
      return;
    }

    const newGrid = grid.map((cell) => {
      const isSameCell = cell.x === updatedCell.x && cell.y === updatedCell.y;
      return isSameCell ? updatedCell : cell;
    });

    setGrid(newGrid);
    saveState(newGrid);
  };

  useEffect(() => {
    const loadedGrid = loadState() ?? generateGrid(SIZE_X, SIZE_Y);
    setGrid(loadedGrid);
  }, []);

  if (!grid) {
    return null;
  }

  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      <div
        style={{
          gridTemplateRows: `repeat(${SIZE_Y}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${SIZE_X}, minmax(0, 1fr))`,
        }}
        className="grid h-fit"
      >
        {grid.map((gridItem) => {
          const key = `${gridItem.x}-${gridItem.y}`;
          return <GridCell key={key} cell={gridItem} onCellClick={onCellClick} />;
        })}
      </div>
    </div>
  );
};
