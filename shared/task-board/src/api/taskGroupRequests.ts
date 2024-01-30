import { storage } from "@services/storage";
import { TTaskGroup } from "../types/taskGroup";
import { generateMockTaskGroups } from "../utils/generateMockData";

export const getTaskGroupList = () => {
  const cachedData = storage.getItem("task-group-list");
  if (cachedData) {
    return cachedData as TTaskGroup[];
  }

  const generatedData = generateMockTaskGroups();
  storage.setItem("task-group-list", generatedData);

  return generatedData;
};
