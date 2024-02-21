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
      const ordinalNumber = index + 1;

      const item = {
        id: `${Date.now()}-${Math.random() * 1000}`.replace(".", ""),
        ordinalNumber: ordinalNumber,
        description: `Task description #${ordinalNumber}`,
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

  // --- Generate ids --- //
  const COL_PREFIX = "column" as const;
  const TASK_PREFIX = "task" as const;

  const getColumnId = (status: TTaskStatus) => {
    return `${COL_PREFIX}-${status}` as const;
  };

  const getTaskId = (taskId: string) => {
    return `${TASK_PREFIX}-${taskId}` as const;
  };

  // --- Helpers --- //
  const resetOrdinalNumbers = (taskList: TTask[]) => {
    const groupCount = {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.CANCELED]: 0,
      [TaskStatus.FAILED]: 0,
      [TaskStatus.COMPLETED]: 0,
    } as Record<TTaskStatus, number>;

    for (const task of taskList) {
      groupCount[task.status] += 1;
      task.ordinalNumber = groupCount[task.status];
    }

    return taskList;
  };

  // --- Handler moving tasks --- //

  const movingTaskId = useRef<string | null>(null);
  const movingTaskOrdinal = useRef<number | null>(null);

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
        task.ordinalNumber = movingTaskOrdinal.current ?? task.ordinalNumber;
      }

      return task;
    });

    const updatedOrdinalTaskList = resetOrdinalNumbers(updatedTaskList);

    storage.setItem("task-list", updatedOrdinalTaskList);
    movingTaskId.current = null;

    // @ts-ignore
    if (typeof document.startViewTransition === "function") {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => {
          setTaskList(updatedTaskList);
        });
      });
    } else {
      setTaskList(updatedTaskList);
    }
  };

  const dragTaskOver = (event: DragEvent<HTMLDivElement>, _status: TTaskStatus) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target as HTMLElement;
    const isTask = targetElement.id.startsWith(TASK_PREFIX);

    if (!isTask) {
      return;
    }

    const { top, height } = targetElement.getBoundingClientRect();
    const isUpperHalf = event.clientY - top < height / 2;

    const targetOrdinal = Number(targetElement.getAttribute("data-ordinal"));
    movingTaskOrdinal.current = isUpperHalf ? targetOrdinal : targetOrdinal + 1;
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
