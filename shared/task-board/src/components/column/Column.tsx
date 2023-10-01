import { TTaskGroup } from "../../types/taskGroup";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  children: React.ReactNode;
  columnData: TTaskGroup;
}

export const Column = ({ children, columnData }: IProps) => {
  return (
    <div
      key={columnData.id}
      className="group basis-full h-full relative border border-gray-700 rounded-lg transition-all transition-150 hover:border-gray-600 hover:bg-gray-700/25"
    >
      <ColumnTitle title={columnData.title} />
      <div className="h-full flex items-center">{children}</div>
    </div>
  );
};
