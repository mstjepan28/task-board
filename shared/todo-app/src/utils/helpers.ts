import { TTaskStatus } from "../enums/taskStatus";

export const COL_PREFIX = "column" as const;
export const TASK_PREFIX = "task" as const;

export const getColumnId = (status: TTaskStatus) => {
  return `${COL_PREFIX}-${status}` as const;
};

export const getTaskId = (taskId: string) => {
  return `${TASK_PREFIX}-${taskId}` as const;
};
