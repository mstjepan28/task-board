import { useColumns } from "../../hooks/useColumns";
import { TTask } from "../../types/task";

interface IProps {
  taskList: TTask[];
}

export const TaskBoardUi = ({ taskList }: IProps) => {
  const { columns, setColumns } = useColumns(taskList);

  return (
    <div className="h-screen-safe p-4 flex gap-x-2 bg-gray-800">
      {columns.map((col) => {
        return (
          <div
            key={col.id}
            className="basis-full h-full flex items-center justify-center border border-gray-700 rounded-xl transition-all transition-150 hover:border-gray-600 hover:bg-gray-700"
          >
            {col.title}
          </div>
        );
      })}
    </div>
  );
};
