import { Dayjs } from "dayjs";
import { TTaskStatus } from "../enums/taskStatus";

export type TTask = {
  id: string;
  ordinalNumber: number;
  description: string;
  status: TTaskStatus;
  createdAt: Dayjs;
  updatedAt: Dayjs;
};
