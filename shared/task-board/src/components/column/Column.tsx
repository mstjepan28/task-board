import { useDropTask } from "../../hooks/useDropTask";
import { TTaskGroup } from "../../types/taskGroup";
import { TaskCard } from "../task/TaskCard";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  columnData: TTaskGroup;
}

export const Column = ({ columnData }: IProps) => {
  const columnId = `col-${columnData.id}`;
  useDropTask(columnId);

  const renderTaskList = () => {
    const taskList = columnData.taskList;
    return taskList.map((task) => <TaskCard key={task.id} task={task} />);
  };

  return (
    <div id={columnId} className="basis-full min-h-full relative border border-gray-700 rounded-lg">
      <ColumnTitle title={columnData.title} />
      <div className="h-full flex flex-col items-center gap-y-2 px-2 pb-2 mt-5">{renderTaskList()}</div>
    </div>
  );
};
