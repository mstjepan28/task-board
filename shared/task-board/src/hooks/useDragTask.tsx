import { useEffect, useState } from "react";
import { TTask } from "../types/task";
import { storage } from "@shared/storage";

export const useDragTask = (taskId: string, task: TTask) => {
  const [isBeingMoved, setIsBeingMoved] = useState(false);

  const handleDragStart = () => {
    setIsBeingMoved(true);
    storage.setItem("move-task", task);
  };

  const handleDragEnd = () => {
    setIsBeingMoved(false);
    storage.removeItem("move-task");
  };

  useEffect(() => {
    const taskElement = document.getElementById(taskId);
    if (!taskElement) {
      console.error(`Cannot find task element: ${taskId}`);
      return;
    }

    taskElement.addEventListener("dragstart", handleDragStart);
    taskElement.addEventListener("dragend", handleDragEnd);

    return () => {
      taskElement.removeEventListener("dragstart", handleDragStart);
      taskElement.removeEventListener("dragend", handleDragStart);
    };
  }, []);

  return { isBeingMoved };
};
