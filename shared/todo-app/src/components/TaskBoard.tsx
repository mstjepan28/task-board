import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TaskColumn } from "./TaskColumn";

export const TaskBoard = () => {
  const { getGroupedTaskList } = useContext(TaskListContext);
  const group = getGroupedTaskList();

  return (
    <div className="h-full flex flex-col">
      <div className="flex basis-full gap-x-4 px-8 py-4">
        <TaskColumn title="Pending" taskList={group.pending} />
        <TaskColumn title="In progress" taskList={group.in_progress} />
        <TaskColumn title="Canceled" taskList={group.canceled} />
        <TaskColumn title="Failed" taskList={group.failed} />
        <TaskColumn title="Completed" taskList={group.completed} />
      </div>
    </div>
  );
};
