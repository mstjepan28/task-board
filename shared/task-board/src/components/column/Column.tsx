import { useEffect } from "react";
import { useDropTask } from "../../hooks/useDropTask";
import { TTask } from "../../types/task";
import { TTaskGroup } from "../../types/taskGroup";
import { TaskCard } from "../task/TaskCard";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  columnData: TTaskGroup;
  onTaskMove: (task: TTask | null) => void;
}

export const Column = ({ columnData, onTaskMove }: IProps) => {
  const columnId = `col-${columnData.id}`;
  const { movedTask } = useDropTask(columnId);

  useEffect(() => {
    onTaskMove(movedTask);
  }, [movedTask]);

  const renderTaskList = () => {
    return columnData.taskList.map((task) => {
      return <TaskCard key={task.id} task={task} />;
    });
  };

  return (
    <div className="basis-full min-h-full relative border border-gray-700 rounded-lg">
      <ColumnTitle title={columnData.title} />
      <div id={columnId} className="h-full flex flex-col items-center gap-y-2 px-2 pb-16 mt-5">
        {renderTaskList()}
      </div>
    </div>
  );
};
