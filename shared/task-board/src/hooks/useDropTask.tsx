import { storage } from "@shared/storage";
import { useEffect } from "react";

export const useDropTask = (columnId: string) => {
  const getMovingElement = () => {
    const movingTask = storage.getItem("move-task");
    console.log(movingTask);
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDropTask = () => {
    getMovingElement();
  };

  useEffect(() => {
    const columnElement = document.getElementById(columnId);
    if (!columnElement) {
      console.error(`Column element with id ${columnId} not found`);
      return;
    }

    columnElement.addEventListener("dragover", onDragOver);
    columnElement.addEventListener("drop", onDropTask);

    return () => {
      columnElement.removeEventListener("dragover", onDragOver);
      columnElement.removeEventListener("drop", onDropTask);
    };
  }, []);
};
