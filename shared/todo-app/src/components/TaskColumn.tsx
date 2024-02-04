import { useContext, useMemo } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TTask } from "../types/task";
import { TaskCard } from "./TaskCard";
import { TTaskStatus, TaskStatus } from "../enums/taskStatus";

interface IProps {
  status: TTaskStatus;
  taskList: TTask[];
}

export const TaskColumn = ({ status, taskList }: IProps) => {
  const moveTask = useContext(TaskListContext);

  const onDrop = () => {
    moveTask.dropTask(status);
  };

  const title = useMemo(() => {
    return {
      [TaskStatus.PENDING]: "Pending",
      [TaskStatus.IN_PROGRESS]: "In progress",
      [TaskStatus.CANCELED]: "Canceled",
      [TaskStatus.FAILED]: "Failed",
      [TaskStatus.COMPLETED]: "Completed",
    }[status];
  }, []);

  return (
    <div className="basis-full px-2 rounded-md bg-white/10 border border-white">
      <div className="text-white font-semibold border-b p-2">{title}</div>
      <div
        onDrop={onDrop}
        onDragOver={moveTask.dragTaskOver}
        className="h-full space-y-2 py-4"
      >
        {taskList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
