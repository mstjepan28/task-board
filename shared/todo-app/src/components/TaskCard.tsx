import dayjs from "dayjs";
import { TTask } from "../types/task";
import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

interface IProps {
  task: TTask;
  onClick?: () => void;
}

export const TaskCard = ({ task, onClick }: IProps) => {
  const { dragTask, getTaskId } = useContext(TaskListContext);
  const cardId = getTaskId(task.id);

  return (
    <button
      id={cardId}
      type="button"
      onClick={onClick}
      data-ordinal={task.ordinalNumber}
      onDrag={() => dragTask(task.id)}
      style={{ viewTransitionName: cardId }}
      className="w-full text-start p-2"
      draggable
    >
      <div className="pointer-events-none bg-white rounded-lg p-2">
        <div>
          <p className="text-sm font-medium">{task.description}</p>
        </div>
        <div className="flex text-end mt-2">
          <small className="italic">
            {dayjs(task.createdAt).format("DD.MM.YYYY. HH:mm:ss")}
          </small>
        </div>
      </div>
    </button>
  );
};
