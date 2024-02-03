import { useEffect, useState } from "react";
import { storage } from "@services/storage";
import { TTask } from "../types/task";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export const useTaskList = () => {
  const [dataList, setDataList] = useState<TTask[]>([]);

  const generateTaskList = () => {
    const generateTask = (_: unknown, index: number) => {
      const item = {
        id: faker.string.uuid(),
        ordinalNumber: index + 1,
        description: faker.lorem.sentence(),
        status: "pending",
        createdAt: dayjs(),
        updatedAt: dayjs(),
      } satisfies TTask;

      return item as TTask;
    };

    const taskList = Array.from({ length: 10 }, generateTask);

    storage.setItem("task-list", taskList);
    setDataList(taskList);
  };

  const getTaskList = () => {
    const taskList = storage.getItem<TTask[]>("task-list");

    if (taskList) {
      setDataList(taskList);
      return;
    }

    generateTaskList();
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return { dataList };
};
