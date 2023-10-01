import { useEffect, useState } from "react";
import { TTask } from "../types/task";

export const useMoveTask = (taskId: string, task: TTask) => {
  const [isBeingMoved, setIsBeingMoved] = useState(false);

  const handleDragStart = (event: DragEvent) => {
    setIsBeingMoved(true);
  };

  const handleDragEnd = (event: DragEvent) => {
    setIsBeingMoved(false);
    console.log(event);
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

  return {
    isBeingMoved,
    handleDragStart,
    handleDragEnd,
  };
};
