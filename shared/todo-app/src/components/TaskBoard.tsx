import { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TaskColumn } from "./TaskColumn";
import { TaskStatus } from "../enums/taskStatus";

export const TaskBoard = () => {
  const { groupedTasks } = useContext(TaskListContext);

  return (
    <div className="h-full flex flex-col">
      <div className="flex basis-full gap-x-4 px-8 py-4">
        <TaskColumn
          status={TaskStatus.PENDING}
          taskList={groupedTasks[TaskStatus.PENDING]}
        />
        <TaskColumn
          status={TaskStatus.IN_PROGRESS}
          taskList={groupedTasks[TaskStatus.IN_PROGRESS]}
        />
        <TaskColumn
          status={TaskStatus.CANCELED}
          taskList={groupedTasks[TaskStatus.CANCELED]}
        />
        <TaskColumn
          status={TaskStatus.FAILED}
          taskList={groupedTasks[TaskStatus.FAILED]}
        />
        <TaskColumn
          status={TaskStatus.COMPLETED}
          taskList={groupedTasks[TaskStatus.COMPLETED]}
        />
      </div>
    </div>
  );
};
