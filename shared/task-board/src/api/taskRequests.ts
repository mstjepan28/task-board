import { storage } from "@services/storage";
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

export const updateTask = (task: TTask) => {
  const taskId = task.id;

  const taskList = getTaskList();
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return;
  }

  taskList[taskIndex] = task;
  storage.setItem("task-list", taskList);
};

/**
 * Update task order for a group based on the given task
 */
export const updateTaskOrder = (groupId: string, orderOfTasks: string[]) => {
  const taskList = getTaskListByGroup(groupId);

  const updatedTaskOrders = taskList.map((taskItem) => {
    taskItem.order = orderOfTasks.indexOf(taskItem.id);
    updateTask(taskItem);

    return taskItem;
  });

  return updatedTaskOrders;
};
