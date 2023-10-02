import { useDropTask } from "../../hooks/useDropTask";
import { TTaskGroup } from "../../types/taskGroup";
import { TaskCard } from "../task/TaskCard";
import { ColumnTitle } from "./ColumnTitle";

interface IProps {
  columnData: TTaskGroup;
}

export const Column = ({ columnData }: IProps) => {
  const columnId = `col-${columnData.id}`;
  const { updatedTaskList } = useDropTask(columnId);

  const taskList = updatedTaskList || columnData.taskList;

  return (
    <div className="basis-full min-h-full relative border border-gray-700 rounded-lg">
      <ColumnTitle title={columnData.title} />
      <div id={columnId} className="h-full flex flex-col items-center gap-y-2 px-2 pb-16 mt-5">
        {taskList.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
