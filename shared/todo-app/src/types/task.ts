import { TTaskStatus } from "../enums/taskStatus";

export type TTask = {
  id: string;
  ordinalNumber: number;
  description: string;
  status: TTaskStatus;
  createdAt: string;
  updatedAt: string;
};
