import { useTaskList } from "../hooks/useTaskList";
import { TaskColumn } from "./TaskColumn";

export const TaskBoard = () => {
  const { groupedTaskList } = useTaskList();
  const { pending, in_progress, canceled, failed, completed } = groupedTaskList;

  return (
    <div className="h-full flex flex-col">
      <div className="flex basis-full gap-x-4 px-8 py-4">
        <TaskColumn title="Pending" taskList={pending} />
        <TaskColumn title="In progress" taskList={in_progress} />
        <TaskColumn title="Canceled" taskList={canceled} />
        <TaskColumn title="Failed" taskList={failed} />
        <TaskColumn title="Completed" taskList={completed} />
      </div>
    </div>
  );
};
