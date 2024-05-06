import { useEffect, useState } from "react";
import type { TDirection } from "../enums/directions";

type TGridCell = {
  x: number;
  y: number;
  direction: TDirection | null;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
};

const generateGrid = (sizeX: number, sizeY: number): TGridCell[] => {
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

type TGridCellProps = {
  cell: TGridCell;
  onCellClick: (updatedCell: TGridCell) => void;
};

const GridCell = ({ cell, onCellClick }: TGridCellProps) => {
  const getBackgroundColor = () => {
    if (cell.isStart) {
      return "bg-green-500";
    } else if (cell.isEnd) {
      return "bg-red-500";
    } else if (cell.isWall) {
      return "bg-gray-300";
    }

    return "bg-white";
  };

  const toggleWall = () => {
    if (cell.isStart || cell.isEnd) {
      return;
    }

    cell.isWall = !cell.isWall;
    onCellClick(cell);
  };

  return (
    <button
      type="button"
      onClick={toggleWall}
      className={`size-12 border flex items-center cursor-pointer justify-center border-gray-400 ${getBackgroundColor()}`}
    >
      <span className="text-xs select-none">{`${cell.x}x${cell.y}`}</span>
    </button>
  );
};

export const PathFinderScreen = () => {
  const [grid, setGrid] = useState<TGridCell[] | null>(null);

  const SIZE_X = 12;
  const SIZE_Y = 9;

  const onCellClick = (updatedCell: TGridCell) => {
    if (!grid) {
      return;
    }

    const newGrid = grid.map((cell) => {
      if (cell.x === updatedCell.x && cell.y === updatedCell.y) {
        return updatedCell;
      }

      return cell;
    });

    setGrid(newGrid);
  };

  useEffect(() => {
    const newGrid = generateGrid(SIZE_X, SIZE_Y);
    setGrid(newGrid);
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
          return <GridCell key={`${gridItem.x}-${gridItem.y}`} cell={gridItem} onCellClick={onCellClick} />;
        })}
      </div>
    </div>
  );
};
