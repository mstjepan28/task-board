import { TTaskGroup } from "../../types/taskGroup";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  children: React.ReactNode;
  columnData: TTaskGroup;
}

export const Column = ({ children, columnData }: IProps) => {
  return (
    <div id={columnData.id} className="basis-full min-h-full relative border border-gray-700 rounded-lg">
      <ColumnTitle title={columnData.title} />
      <div className="h-full flex flex-col items-center gap-y-2 px-2 pb-2 mt-5">{children}</div>
    </div>
  );
};
