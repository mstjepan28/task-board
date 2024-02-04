import { faker } from "@faker-js/faker";
import { storage } from "@services/storage";
import dayjs from "dayjs";
import { DragEvent, useRef } from "react";
import { TTaskStatus, TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";

export const useTaskList = () => {
  const generateTaskList = () => {
    const generateTask = (_: unknown, index: number) => {
      const item = {
        id: faker.string.uuid(),
        ordinalNumber: index + 1,
        description: faker.lorem.sentence(),
        status: TaskStatus.PENDING,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      } satisfies TTask;

      return item as TTask;
    };

    const taskList = Array.from({ length: 10 }, generateTask);

    storage.setItem("task-list", taskList);
    return taskList;
  };

  const getTaskList = () => {
    const taskList = storage.getItem<TTask[]>("task-list");
    if (taskList) {
      return taskList;
    }

    return generateTaskList();
  };

  const getGroupedTaskList = () => {
    const taskList = getTaskList();

    const initData = {
      [TaskStatus.PENDING]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.CANCELED]: [],
      [TaskStatus.FAILED]: [],
      [TaskStatus.COMPLETED]: [],
    } as Record<TTaskStatus, TTask[]>;

    return taskList.reduce((acc, task) => {
      const { status } = task;

      if (!acc[status]) {
        acc[status] = [];
      }

      acc[status].push(task);
      return acc;
    }, initData);
  };

  // --- Handler moving tasks --- //
  const movingTaskRef = useRef<TTask | null>(null);

  const dragTask = (task: TTask) => {
    if (movingTaskRef.current?.id === task.id) {
      return;
    }

    console.log("Task picked up");
    movingTaskRef.current = task;
  };

  const dropTask = (newStatus: TTaskStatus) => {
    console.log("Task dropped: ", newStatus);
    movingTaskRef.current = null;
  };

  const dragTaskOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    dragTask,
    dropTask,
    dragTaskOver,
    getGroupedTaskList,
  };
};
