import { useContext, useMemo } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TTaskStatus, TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";
import { TaskCard } from "./TaskCard";
import { getColumnId } from "../utils/helpers";

interface IProps {
  status: TTaskStatus;
  taskList: TTask[];
  onTaskClick: (task: TTask) => void;
}

export const TaskColumn = ({ status, taskList, onTaskClick }: IProps) => {
  const { dropTask, dragTaskOver } = useContext(TaskListContext);
  const columnId = getColumnId(status);

  const title = useMemo(() => {
    return {
      [TaskStatus.PENDING]: "Pending",
      [TaskStatus.IN_PROGRESS]: "In progress",
      [TaskStatus.CANCELED]: "Canceled",
      [TaskStatus.FAILED]: "Failed",
      [TaskStatus.COMPLETED]: "Completed",
    }[status];
  }, []);

  const renderTaskList = () => {
    return taskList.map((task) => {
      const onClick = () => {
        onTaskClick(task);
      };

      return <TaskCard key={task.id} task={task} onClick={onClick} />;
    });
  };

  return (
    <div className="basis-full flex flex-col rounded-md border border-white">
      <div className="text-white font-semibold border-b px-4 py-2">{title}</div>

      <div id={columnId} className="basis-full" onDrop={() => dropTask(status)} onDragOver={dragTaskOver}>
        {renderTaskList()}
      </div>
    </div>
  );
};
