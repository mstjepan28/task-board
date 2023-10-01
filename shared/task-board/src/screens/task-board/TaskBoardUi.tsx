import { Column } from "../../components/column/Column";
import { TTaskGroup } from "../../types/taskGroup";

interface IProps {
  taskGroupList: TTaskGroup[];
}

export const TaskBoardUi = ({ taskGroupList }: IProps) => {
  return (
    <div className="min-h-screen-safe p-4 flex gap-x-2 bg-gray-800">
      {taskGroupList.map((taskGroup) => {
        return <Column key={taskGroup.id} columnData={taskGroup} />;
      })}
    </div>
  );
};
