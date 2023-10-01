export const CacheDataSignature = {
  MOVE_TASK: "move-task",
  TASK_GROUP_LIST: "task-group-list",
  TASK_LIST: "task-list",
} as const;

export type TCacheDataSignature = (typeof CacheDataSignature)[keyof typeof CacheDataSignature];
