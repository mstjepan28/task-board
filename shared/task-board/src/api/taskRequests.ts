import { storage } from "@shared/storage";
import { TTask } from "../types/task";
import { generateMockTasksForGroups } from "../utils/generateMockData";

const sortTaskListInOrder = (taskList: TTask[]) => {
  return taskList.sort((a, b) => a.order - b.order);
};

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
  const filteredTaskList = taskList.filter(({ taskGroupId }) => taskGroupId === groupId);
  return sortTaskListInOrder(filteredTaskList);
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

export const updateTaskOrder = (task: TTask) => {
  const taskList = getTaskListByGroup(task.taskGroupId);

  let foundTask = false;
  for (let i = 0; i < taskList.length; i++) {
    const taskItem = taskList[i];

    if (taskItem.id === task.id) {
      foundTask = true;
    } else if (foundTask) {
      taskItem.order = i;
      updateTask(taskItem.id, taskItem);
    }
  }

  return taskList;
};
