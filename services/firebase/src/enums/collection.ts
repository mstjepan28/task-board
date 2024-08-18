export const Collection = {
  TASKS: "tasks",
  USERS: "users",
} as const;

export type TCollection = (typeof Collection)[keyof typeof Collection];
