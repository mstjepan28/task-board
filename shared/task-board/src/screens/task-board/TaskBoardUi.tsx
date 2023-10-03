import { Column } from "../../components/column/Column";
import { TTask } from "../../types/task";
import { TTaskGroup } from "../../types/taskGroup";

interface IProps {
  taskGroupList: TTaskGroup[];
  onTaskMove: (task: TTask | null) => void;
}

export const TaskBoardUi = ({ taskGroupList, onTaskMove }: IProps) => {
  return (
    <div className="min-h-screen-safe p-4 flex gap-x-2 bg-gray-800">
      {taskGroupList.map((taskGroup) => {
        return <Column key={taskGroup.id} columnData={taskGroup} onTaskMove={onTaskMove} />;
      })}
    </div>
  );
};
