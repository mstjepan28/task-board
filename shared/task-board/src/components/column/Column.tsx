import { TColumn } from "../../types/column";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  column: TColumn;
}

export const Column = ({ column }: IProps) => {
  return (
    <div
      key={column.id}
      className="group basis-full h-full relative flex items-center  border border-gray-700 rounded-lg transition-all transition-150 hover:border-gray-600 hover:bg-gray-700/25"
    >
      <ColumnTitle title={column.title} />
    </div>
  );
};
