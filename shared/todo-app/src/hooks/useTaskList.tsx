import { useEffect, useState } from "react";
import { storage } from "@services/storage";
import { TTask } from "../types/task";

export const useTaskList = () => {
  const [dataList, setDataList] = useState<TTask[]>([]);

  const generateTaskList = () => {};

  useEffect(() => {
    generateTaskList();
  }, []);

  return { dataList };
};
