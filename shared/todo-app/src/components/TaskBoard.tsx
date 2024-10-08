import { Button, Searchbar } from "@services/ui";
import { useContext, useRef } from "react";
import { TaskListContext } from "../context/TaskListContext";
import { TaskStatus } from "../enums/taskStatus";
import type { TOverlayRef } from "../types/overlay";
import type { TTask } from "../types/task";
import { DeleteButton } from "./DeleteButton";
import { TaskColumn } from "./TaskColumn";
import { CreateEditTaskDrawer } from "./drawer/CreateEditTaskDrawer";

export const TaskBoard = () => {
  const { groupedTasks } = useContext(TaskListContext);
  const baseRef = useRef(null) as TOverlayRef;

  const openDrawer = (task?: TTask | undefined) => {
    baseRef.current?.open(task);
  };

  return (
    <>
      <CreateEditTaskDrawer baseRef={baseRef} />

      <div className="h-full flex flex-col">
        <div className="basis-full flex-col flex px-8 py-4 space-y-4">
          <div className="flex items-stretch gap-x-4">
            <Searchbar searchFn={() => {}} />
            <Button
              onClick={() => openDrawer()}
              className="hover:bg-blue-600 hover:text-white uppercase text-sm font-semibold transition-all"
            >
              Create
            </Button>
            <DeleteButton />
          </div>

          <div className="basis-full flex gap-x-4 ">
            <TaskColumn
              status={TaskStatus.PENDING}
              taskList={groupedTasks[TaskStatus.PENDING]}
              onTaskClick={openDrawer}
            />
            <TaskColumn
              status={TaskStatus.IN_PROGRESS}
              taskList={groupedTasks[TaskStatus.IN_PROGRESS]}
              onTaskClick={openDrawer}
            />
            <TaskColumn
              status={TaskStatus.CANCELED}
              taskList={groupedTasks[TaskStatus.CANCELED]}
              onTaskClick={openDrawer}
            />
            <TaskColumn
              status={TaskStatus.FAILED}
              onTaskClick={openDrawer}
              taskList={groupedTasks[TaskStatus.FAILED]}
            />
            <TaskColumn
              status={TaskStatus.COMPLETED}
              taskList={groupedTasks[TaskStatus.COMPLETED]}
              onTaskClick={openDrawer}
            />
          </div>
        </div>
      </div>
    </>
  );
};
