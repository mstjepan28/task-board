import { storage } from "@services/storage";
import { supabase } from "@services/supabase";
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

  // ------ Generate ids ----------- //
  const COL_PREFIX = "column" as const;
  const TASK_PREFIX = "task" as const;

  const getColumnId = (status: TTaskStatus) => {
    return `${COL_PREFIX}-${status}` as const;
  };

  const getTaskId = (taskId: string) => {
    return `${TASK_PREFIX}-${taskId}` as const;
  };

  // ------ Helpers ---------------- //
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

  // ------ Placeholder ------------ //
  const PLACEHOLDER_ID = "placeholder-elem" as const;
  const placeholder = useRef({
    elementId: null as string | null,
    isUpperHalf: false as boolean | undefined,
  });

  const checkIfPlaceholderStillValid = (target: HTMLElement, isUpperHalf: boolean) => {
    const isSameTarget = placeholder.current.elementId === target.id;
    const isSameHalf = placeholder.current.isUpperHalf === isUpperHalf;

    return isSameTarget && isSameHalf;
  };

  const destroyPlaceholder = () => {
    const placeholderElement = document.getElementById(PLACEHOLDER_ID);
    if (placeholderElement) {
      placeholderElement.remove();
    }

    placeholder.current.elementId = null;
    placeholder.current.isUpperHalf = false;
  };

  const createPlaceholder = (targetElement: HTMLElement, isUpperHalf?: boolean | undefined) => {
    const placeholderElement = document.createElement("div");
    placeholderElement.id = PLACEHOLDER_ID;
    placeholderElement.classList.add("h-8", "border", "rounded-lg", "mx-2", "my-1", "border-dashed", "border-gray-300");

    placeholder.current.elementId = targetElement.id;
    placeholder.current.isUpperHalf = isUpperHalf;

    return placeholderElement;
  };

  // ------ Handler moving tasks --- //

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

    updatedTaskList.sort((a, b) => a.ordinalNumber - b.ordinalNumber);

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

    destroyPlaceholder();
  };

  const dragOverTask = (targetElement: HTMLElement, clientY: number) => {
    const { top, height } = targetElement.getBoundingClientRect();
    const isUpperHalf = clientY - top < height / 2;

    /**
     * we use +/- 0.1 to avoid the duplicate ordinal numbers in the same column
     */
    const targetOrdinal = Number(targetElement.getAttribute("data-ordinal"));
    movingTaskOrdinal.current = isUpperHalf ? targetOrdinal - 0.1 : targetOrdinal + 0.1;

    const isOldPlaceholderValid = checkIfPlaceholderStillValid(targetElement, isUpperHalf);
    if (isOldPlaceholderValid) {
      return;
    }

    destroyPlaceholder();
    const placeholderElement = createPlaceholder(targetElement, isUpperHalf);

    if (isUpperHalf) {
      targetElement.before(placeholderElement);
    } else {
      targetElement.after(placeholderElement);
    }
  };

  const dragOverColumn = (targetElement: HTMLElement) => {
    destroyPlaceholder();

    movingTaskOrdinal.current = Infinity;

    const placeholderElement = createPlaceholder(targetElement);
    targetElement.appendChild(placeholderElement);
  };

  const dragTaskOver = (event: DragEvent<HTMLDivElement>, _status: TTaskStatus) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target as HTMLElement;
    if (targetElement.id.startsWith(TASK_PREFIX)) {
      dragOverTask(targetElement, event.clientY);
    } else if (targetElement.id.startsWith(COL_PREFIX)) {
      dragOverColumn(targetElement);
    }
  };

  const deleteTask = () => {
    const taskId = movingTaskId.current;
    if (taskId === null) {
      console.error("Task not found");
      movingTaskId.current = null;

      return;
    }

    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    storage.setItem("task-list", updatedTaskList);
    movingTaskId.current = null;

    setTaskList(updatedTaskList);
    destroyPlaceholder();
  };

  useEffect(() => {
    const getTodos = async () => {
      const { data: todos } = await supabase.from("todos").select();

      if (todos && todos.length > 1) {
        console.log("todos", todos);
      }
    };

    getTodos();
  }, []);

  return {
    dragTask,
    dropTask,
    dragTaskOver,
    groupedTasks,
    getColumnId,
    getTaskId,
    deleteTask,
  };
};
