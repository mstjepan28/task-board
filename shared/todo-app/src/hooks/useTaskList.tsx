import { faker } from "@faker-js/faker";
import { storage } from "@services/storage";
import dayjs from "dayjs";
import { DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { TTaskStatus, TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";

export const useTaskList = () => {
  const [taskList, setTaskList] = useState<TTask[]>([]);

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

  const groupedTasks = useMemo(() => {
    const initTaskGroup = {
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
    }, initTaskGroup);
  }, [taskList]);

  useEffect(() => {
    const readTaskList = getTaskList();
    setTaskList(readTaskList);
  }, []);

  // --- Handler moving tasks --- //
  const movingTaskId = useRef<string | null>(null);

  const dragTask = (taskId: string) => {
    movingTaskId.current = taskId;
  };

  const dropTask = (newStatus: TTaskStatus) => {
    const taskId = movingTaskId.current;
    if (taskId === null) {
      console.error("Task not found");
      movingTaskId.current = null;

      return;
    }

    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        task.status = newStatus;
        task.updatedAt = dayjs().toISOString();
      }

      return task;
    });

    storage.setItem("task-list", updatedTaskList);
    movingTaskId.current = null;

    // @ts-ignore - startViewTransition is not yet in the types
    document.startViewTransition(() => {
      flushSync(() => {
        setTaskList(updatedTaskList);
      });
    });
  };

  const dragTaskOver = (
    event: DragEvent<HTMLDivElement>,
    status: TTaskStatus
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // --- Generate ids --- //
  const getColumnId = (status: TTaskStatus) => {
    return `task-list-${status}` as const;
  };

  const getTaskId = (taskId: string) => {
    return `task-${taskId}` as const;
  };

  return {
    dragTask,
    dropTask,
    dragTaskOver,
    groupedTasks,
    getColumnId,
    getTaskId,
  };
};
