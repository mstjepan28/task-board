import dayjs from "dayjs";
import { TTask } from "../types/task";
import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const { dragTask, getTaskId } = useContext(TaskListContext);
  const cardId = getTaskId(task.id);

  return (
    <div
      id={cardId}
      data-ordinal={task.ordinalNumber}
      onDrag={() => dragTask(task.id)}
      className="bg-white rounded-lg p-2"
      style={{ viewTransitionName: cardId }}
      draggable
    >
      <div className="pointer-events-none">
        <div>
          <p className="text-sm font-medium">{task.description}</p>
        </div>
        <div className="flex text-end mt-2">
          <small className="italic">{dayjs(task.createdAt).format("DD.MM.YYYY. HH:mm:ss")}</small>
        </div>
      </div>
    </div>
  );
};
