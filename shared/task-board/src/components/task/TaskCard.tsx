import { useDragTask } from "../../hooks/useDragTask";
import { TTask } from "../../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const taskId = `task-${task.id}`;
  useDragTask(taskId, task);

  return (
    <div>
      <div
        id={taskId}
        draggable
        style={{ backgroundColor: task.backgroundColor }}
        className="cursor-pointer p-1 rounded-lg border border-gray-100"
      >
        <span className="select-none text-sm text-gray-300">{task.title}</span>
      </div>
    </div>
  );
};
