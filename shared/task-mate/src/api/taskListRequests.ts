import { fakeApiRequest } from "@services/utils";
import { mockTaskList } from "../data/mockTaskList";
import { taskListSchema } from "../schema/taskSchema";
import type { TTaskListFilters } from "../types/taskListFilters";

export const fetchTaskList = async (_filters: TTaskListFilters) => {
  const data = await fakeApiRequest(mockTaskList);
  const validatedData = taskListSchema.parse(data);

  return {
    data: validatedData,
    totalPages: Math.ceil(validatedData.length / 15),
  };
};
