import dayjs from "dayjs";
import { TTask } from "../types/task";
import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const moveTask = useContext(TaskListContext);

  const onDrag = () => {
    moveTask.dragTask(task);
  };

  return (
    <div onDrag={onDrag} className="bg-white rounded-lg p-2" draggable>
      <div>
        <p className="text-sm font-medium">{task.description}</p>
      </div>
      <div className="flex justify-end mt-2">
        <small className="italic">
          {dayjs(task.createdAt).format("DD.MM.YYYY. HH:mm:ss")}
        </small>
      </div>
    </div>
  );
};
