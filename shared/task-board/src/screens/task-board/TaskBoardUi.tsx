import { Column } from "../../components/column/Column";
import { useColumns } from "../../hooks/useColumns";
import { TTask } from "../../types/task";

interface IProps {
  taskList: TTask[];
}

export const TaskBoardUi = ({ taskList }: IProps) => {
  const { columns, setColumns } = useColumns(taskList);

  return (
    <div className="h-screen-safe p-4 flex gap-x-2 bg-gray-800">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};
