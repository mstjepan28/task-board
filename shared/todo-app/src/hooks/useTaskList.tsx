import { supabase } from "@services/supabase";
import dayjs from "dayjs";
import type { DragEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { TTaskStatus } from "../enums/taskStatus";
import { TaskStatus } from "../enums/taskStatus";
import type { TTask } from "../types/task";
import { COL_PREFIX, TASK_PREFIX } from "../utils/helpers";

export const useTaskList = () => {
  const [taskList, setTaskList] = useState<TTask[]>([]);

  const movingTask = useRef<TTask | null>(null);
  const movingTaskOrdinal = useRef<number | null>(null);

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

  // ------------------------------------------------- //
  // ------------------- Helpers --------------------- //
  // ------------------------------------------------- //
  const updateTaskListData = (movedTask: TTask, newStatus: TTaskStatus) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === movedTask.id) {
        task.status = newStatus;
        task.updated_at = dayjs().toISOString();
        task.ordinalNumber = movingTaskOrdinal.current ?? task.ordinalNumber;
      }

      return task;
    });

    updatedTaskList.sort((a, b) => a.ordinalNumber - b.ordinalNumber);

    const groupCount = {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.CANCELED]: 0,
      [TaskStatus.FAILED]: 0,
      [TaskStatus.COMPLETED]: 0,
    } as Record<TTaskStatus, number>;

    for (const task of updatedTaskList) {
      groupCount[task.status] += 1;
      task.ordinalNumber = groupCount[task.status];
    }

    return updatedTaskList;
  };

  const updateTaskListUi = (updatedTaskList: TTask[]) => {
    // @ts-ignore
    if (typeof document.startViewTransition === "function") {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => setTaskList(updatedTaskList));
      });
    } else {
      setTaskList(updatedTaskList);
    }
  };

  // ------------------------------------------------- //
  // ------------ Handle placeholder ----------------- //
  // ------------------------------------------------- //
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

  // ------------------------------------------------- //
  // ------------ Handle drag and drop --------------- //
  // ------------------------------------------------- //
  const dragTask = (task: TTask) => {
    movingTask.current = task;
  };

  const dropTask = (newStatus: TTaskStatus) => {
    const movedTask = movingTask.current;
    if (movedTask === null) {
      console.error("Task not found");
      movingTask.current = null;

      return;
    }

    const oldStatus = movedTask.status;
    const affectedStatuses = [oldStatus, newStatus];

    const updatedTaskList = updateTaskListData(movedTask, newStatus);
    updateTaskList(affectedStatuses, movedTask.ordinalNumber);

    updateTaskListUi(updatedTaskList);

    movingTask.current = null;
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

    movingTaskOrdinal.current = Number.POSITIVE_INFINITY;

    const placeholderElement = createPlaceholder(targetElement);
    targetElement.appendChild(placeholderElement);
  };

  const dragTaskOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target as HTMLElement;
    if (targetElement.id.startsWith(TASK_PREFIX)) {
      dragOverTask(targetElement, event.clientY);
    } else if (targetElement.id.startsWith(COL_PREFIX)) {
      dragOverColumn(targetElement);
    }
  };

  // ------------------------------------------------- //
  // ------------ Handle task crud ------------------- //
  // ------------------------------------------------- //
  const createTask = async (status: TTaskStatus, description: string) => {
    const ordinalNumber = groupedTasks[status].length + 1;

    const newTask = {
      ordinalNumber: ordinalNumber,
      description: description,
      status: status,
    } as TTask;

    await supabase.from("tasks").insert([newTask]);

    newTask.id = `task-${Date.now()}`;
    setTaskList([...taskList, newTask]);
  };

  const readTaskList = async () => {
    const { data } = await supabase.from("tasks").select("*");
    setTaskList(data as TTask[]);
  };

  const updateTaskList = async (updatedStatuses: TTaskStatus[], ordinalNumber: number) => {
    const impactedTaskList = taskList.filter((task) => {
      const didMoveDown = task.ordinalNumber >= ordinalNumber;
      const inSameStatus = updatedStatuses.includes(task.status);

      return didMoveDown && inSameStatus;
    });

    for (const task of impactedTaskList) {
      const updatedTask = { ...task, ordinalNumber: task.ordinalNumber + 1 };
      await supabase.from("tasks").update(updatedTask).eq("id", task.id);
    }
  };

  const deleteTask = async () => {
    const movedTask = movingTask.current;
    if (movedTask === null) {
      console.error("Task not found");
      movingTask.current = null;

      return;
    }

    await supabase.from("tasks").delete().eq("id", movedTask.id);

    const updatedTaskList = taskList.filter((task) => task.id !== movedTask.id);
    setTaskList(updatedTaskList);

    destroyPlaceholder();
    movingTask.current = null;
  };

  useEffect(() => {
    readTaskList();
  }, []);

  return {
    // --- DATA ---
    groupedTasks,

    // --- DRAG AND DROP ---
    dragTask,
    dropTask,
    dragTaskOver,

    // --- CRUD ---
    deleteTask,
    createTask,
  };
};
