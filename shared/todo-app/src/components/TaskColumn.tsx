import { DragEvent, useContext, useMemo } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TTask } from "../types/task";
import { TaskCard } from "./TaskCard";
import { TTaskStatus, TaskStatus } from "../enums/taskStatus";

interface IProps {
  status: TTaskStatus;
  taskList: TTask[];
}

export const TaskColumn = ({ status, taskList }: IProps) => {
  const { dropTask, dragTaskOver, getColumnId } = useContext(TaskListContext);
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

  const onDrop = () => {
    dropTask(status);
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    dragTaskOver(event, status);
  };

  return (
    <div className="basis-full rounded-md bg-white/10 border border-white">
      <div className="text-white font-semibold border-b px-4 py-2">{title}</div>

      <div id={columnId} onDrop={onDrop} onDragOver={onDragOver} className="h-full py-4">
        {taskList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
