import { storage } from "@shared/storage";
import { TTask } from "../types/task";
import { generateMockTasksForGroups } from "../utils/generateMockData";

export const getTaskList = () => {
  const cachedData = storage.getItem("task-list");
  if (cachedData) {
    return cachedData as TTask[];
  }

  const generatedData = generateMockTasksForGroups();
  storage.setItem("task-list", generatedData);

  return generatedData;
};

export const getTaskListByGroup = (groupId: string) => {
  const taskList = getTaskList();
  return taskList.filter(({ taskGroupId }) => {
    console.log({ taskGroupId, groupId, isSame: taskGroupId === groupId });
    return taskGroupId === groupId;
  });
};

export const updateTask = (taskId: string, task: TTask) => {
  const taskList = getTaskList();
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return;
  }

  taskList[taskIndex] = task;
  storage.setItem("task-list", taskList);
};
