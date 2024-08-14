import { debounce } from "@services/utils";
import { useEffect, useRef, useState } from "react";
import { GridCell } from "../components/GridCell";
import type { TGridCell } from "../types/gridTypes";
import { generateGrid } from "../utils/generateGrid";
import { loadState, saveState } from "../utils/saveLoadGame";

const SIZE_X = 13;
const SIZE_Y = 9;

export const PathFinderScreen = () => {
  const [grid, setGrid] = useState<TGridCell[] | null>(null);

  const lastDraggedOverCell = useRef<TGridCell["id"] | null>(null);
  const isMousePressed = useRef<boolean>(false);

  const updateGrid = (updatedCell: TGridCell) => {
    if (!grid) {
      return;
    }

    const newGrid = grid.map((c) => (c.id === updatedCell.id ? updatedCell : c));

    setGrid(newGrid);
    saveState(newGrid);
  };

  const onDragOverCell = (updatedCell: TGridCell) => {
    const draggingOverSameCell = lastDraggedOverCell.current === updatedCell.id;
    if (!isMousePressed || draggingOverSameCell) {
      return;
    }

    updatedCell.isWalkable = !updatedCell.isWalkable;
    lastDraggedOverCell.current = updatedCell.id;

    updateGrid(updatedCell);
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
        className="grid h-fit"
        style={{
          gridTemplateRows: `repeat(${SIZE_Y}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${SIZE_X}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((gridItem) => {
          return (
            <div
              key={gridItem.id}
              onMouseUp={() => {
                isMousePressed.current = false;
              }}
              onMouseDown={() => {
                isMousePressed.current = true;
              }}
              onMouseMove={debounce(100, () => onDragOverCell(gridItem))}
            >
              <GridCell cell={gridItem} onCellClick={updateGrid} />
            </div>
          );
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
