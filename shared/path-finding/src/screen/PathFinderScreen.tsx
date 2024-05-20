import { useEffect, useState } from "react";
import { GridCell } from "../components/GridCell";
import type { TGridCell } from "../types/gridTypes";
import { generateGrid } from "../utils/generateGrid";
import { loadState, saveState } from "../utils/saveLoadGame";

export const PathFinderScreen = () => {
  const [grid, setGrid] = useState<TGridCell[] | null>(null);

  const SIZE_X = 13;
  const SIZE_Y = 9;

  const onCellClick = (updatedCell: TGridCell) => {
    if (!grid) {
      return;
    }

    const newGrid = grid.map((cell) => {
      return cell.id === updatedCell.id ? updatedCell : cell;
    });

    setGrid(newGrid);
    saveState(newGrid);
  };

  const generateNewGrid = () => {
    const newGrid = generateGrid(SIZE_X, SIZE_Y);
    saveState(newGrid);
    setGrid(newGrid);
  };

  useEffect(() => {
    const loadedGrid = loadState() ?? generateGrid(SIZE_X, SIZE_Y);
    setGrid(loadedGrid);

    // const aStar = new AStarFinder({
    //   grid: {
    //     matrix: arrayToMatrix<TGridCell>(loadedGrid, SIZE_X),
    //   },
    //   heuristic: "Manhattan",
    // });

    // console.log(aStar);
  }, []);

  if (!grid) {
    return null;
  }

  return (
    <div className="w-full h-[100svh] flex flex-col gap-y-2 items-center justify-center">
      <div
        style={{
          gridTemplateRows: `repeat(${SIZE_Y}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${SIZE_X}, minmax(0, 1fr))`,
        }}
        className="grid h-fit"
      >
        {grid.map((gridItem) => {
          return <GridCell key={gridItem.id} cell={gridItem} onCellClick={onCellClick} />;
        })}
      </div>

      <button
        type="button"
        onClick={generateNewGrid}
        className="bg-white rounded-lg px-4 py-2 uppercase font-bold text-sm border border-gray-400 cursor-pointer hover:bg-gray-100"
      >
        generate new
      </button>
    </div>
  );
};
