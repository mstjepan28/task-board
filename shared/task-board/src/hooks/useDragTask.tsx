import { storage } from "@services/storage";
import { useEffect, useState } from "react";
import { TTask } from "../types/task";

export const useDragTask = (taskId: string, task: TTask) => {
  const [isBeingMoved, setIsBeingMoved] = useState(false);
  const placeholderId = "skeleton-placeholder";

  const removeSkeletonPlaceholder = () => {
    const skeleton = document.getElementById(placeholderId);
    if (skeleton) {
      skeleton.remove();
    }
  };

  const handleDragStart = (event: DragEvent) => {
    setIsBeingMoved(true);

    const taskElement = event?.currentTarget as HTMLElement | undefined;
    const dimensions = taskElement?.getBoundingClientRect() || ({} as DOMRect);

    storage.setItem("move-task", { task, dimensions });
  };

  const handleDragEnd = () => {
    setIsBeingMoved(false);
    storage.removeItem("move-task");

    removeSkeletonPlaceholder();
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
