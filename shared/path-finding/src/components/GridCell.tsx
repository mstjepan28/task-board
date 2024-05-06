import type { TGridCell } from "../types/gridTypes";

interface IProps {
  cell: TGridCell;
  onCellClick: (updatedCell: TGridCell) => void;
}

export const GridCell = ({ cell, onCellClick }: IProps) => {
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
