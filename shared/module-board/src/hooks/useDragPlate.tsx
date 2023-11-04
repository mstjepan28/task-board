import { storage } from "@shared/storage";
import { useEffect, useState } from "react";
import { TPlate } from "../types/plate";

export const useDragPlate = (plateId: string, plate: TPlate) => {
  const [isBeingMoved, setIsBeingMoved] = useState(false);
  const placeholderId = "skeleton-placeholder";

  const removeSkeletonPlaceholder = () => {
    const skeleton = document.getElementById(placeholderId);
    if (skeleton) {
      skeleton.remove();
    }
  };

  const handleDragStart = () => {
    setIsBeingMoved(true);
    storage.setItem("move-item", plate);
  };

  const handleDragEnd = () => {
    setIsBeingMoved(false);
    storage.removeItem("move-item");

    removeSkeletonPlaceholder();
  };

  useEffect(() => {
    const taskElement = document.getElementById(plateId);
    if (!taskElement) {
      console.error(`Cannot find task element: ${plateId}`);
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
