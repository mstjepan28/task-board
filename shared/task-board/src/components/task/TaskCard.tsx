import { useMoveTask } from "../../hooks/useMoveTask";
import { TTask } from "../../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const taskId = `task-${task.id}`;
  const { isBeingMoved } = useMoveTask(taskId, task);

  if (isBeingMoved) {
    return (
      <div className="w-full p-1 rounded-lg bg-gray-800 border border-dashed border-gray-100">
        <span className="select-none text-sm text-transparent">{task.title}</span>
      </div>
    );
  }

  return (
    <div
      id={taskId}
      draggable
      className="w-full group cursor-pointer p-1 rounded-lg bg-gray-800 border border-gray-100 hover:bg-gray-300"
    >
      <span className="select-none text-sm text-gray-300 group-hover:text-gray-800">{task.title}</span>
    </div>
  );
};
