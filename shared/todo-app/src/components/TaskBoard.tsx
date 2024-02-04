import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TaskColumn } from "./TaskColumn";
import { TaskStatus } from "../enums/taskStatus";

export const TaskBoard = () => {
  const { getGroupedTaskList } = useContext(TaskListContext);
  const group = getGroupedTaskList();

  return (
    <div className="h-full flex flex-col">
      <div className="flex basis-full gap-x-4 px-8 py-4">
        <TaskColumn
          status={TaskStatus.PENDING}
          taskList={group[TaskStatus.PENDING]}
        />
        <TaskColumn
          status={TaskStatus.IN_PROGRESS}
          taskList={group[TaskStatus.IN_PROGRESS]}
        />
        <TaskColumn
          status={TaskStatus.CANCELED}
          taskList={group[TaskStatus.CANCELED]}
        />
        <TaskColumn
          status={TaskStatus.FAILED}
          taskList={group[TaskStatus.FAILED]}
        />
        <TaskColumn
          status={TaskStatus.COMPLETED}
          taskList={group[TaskStatus.COMPLETED]}
        />
      </div>
    </div>
  );
};
