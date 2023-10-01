import { storage } from "@shared/storage";
import { generateMockTaskGroups } from "../utils/generateMockData";
import { TTaskGroup } from "../types/taskGroup";

export const getTaskGroupList = () => {
  const cachedData = storage.getItem("task-group-list");
  if (cachedData) {
    return cachedData as TTaskGroup[];
  }

  const generatedData = generateMockTaskGroups();
  storage.setItem("task-group-list", generatedData);

  return generatedData;
};
