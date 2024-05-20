import type { TGridCell } from "../types/gridTypes";

interface IProps {
  cell: TGridCell;
  onCellClick: (updatedCell: TGridCell) => void;
}

export const GridCell = ({ cell, onCellClick }: IProps) => {
  const getBackgroundColor = () => {
    if (!cell.isWalkable) {
      return "bg-gray-300";
    }

    return "bg-white";
  };

  const toggleWall = () => {
    cell.isWalkable = !cell.isWalkable;
    onCellClick(cell);
  };

  return (
    <button
      type="button"
      onClick={toggleWall}
      className={`size-12 border flex items-center cursor-pointer justify-center border-gray-400 ${getBackgroundColor()}`}
    >
      <span className="text-xs select-none">{cell.id}</span>
    </button>
  );
};
