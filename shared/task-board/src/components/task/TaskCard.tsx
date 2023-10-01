import { useDragTask } from "../../hooks/useDragTask";
import { TTask } from "../../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const taskId = `task-${task.id}`;
  useDragTask(taskId, task);

  return (
    <div className="w-full relative">
      {/* TODO: implement element skeleton when moving task */}
      {/* <div
        hidden={!isBeingMoved}
        className="p-1 rounded-lg bg-red-800 pointer-events-none border border-dashed border-gray-100 absolute"
      >
        <span className="select-none text-sm text-transparent">{task.title}</span>
      </div> */}

      <div
        id={taskId}
        draggable
        className="group cursor-pointer p-1 rounded-lg bg-gray-800 border border-gray-100 hover:bg-gray-300"
      >
        <span className="select-none text-sm text-gray-300 group-hover:text-gray-800">{task.title}</span>
      </div>
    </div>
  );
};
