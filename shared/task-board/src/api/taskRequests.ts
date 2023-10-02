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

export const updateTaskOrder = (task: TTask) => {
  const taskList = getTaskListByGroup(task.taskGroupId);

  let foundTask = false;
  const updatedTaskOrders = taskList.map((taskItem, index) => {
    if (taskItem.id === task.id) {
      foundTask = true;
    } else if (foundTask) {
      taskItem.order = index;
      updateTask(taskItem);
    }

    return taskItem;
  });

  const foo = updatedTaskOrders.map(({ title, order }) => `${title} - ${order}`);
  console.log(JSON.stringify(foo, null, 2));

  return updatedTaskOrders;
};
