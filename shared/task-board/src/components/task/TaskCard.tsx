import { useDragTask } from "../../hooks/useDragTask";
import { TTask } from "../../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const taskId = `task-${task.id}`;
  useDragTask(taskId, task);

  return (
    <div
      id={taskId}
      draggable
      data-order={task.order}
      style={{ backgroundColor: task.backgroundColor }}
      className="py-4 flex justify-center items-center  w-full cursor-move p-1 rounded-lg border border-gray-100"
    >
      <span className="select-none text-sm text-gray-300">{task.title}</span>
    </div>
  );
};
