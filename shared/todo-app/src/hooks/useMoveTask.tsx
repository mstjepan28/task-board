import { useRef, DragEvent } from "react";
import { TTask } from "../types/task";

export const useMoveTask = () => {
  const movingTaskRef = useRef<TTask | null>(null);

  const dragTask = (task: TTask) => {
    if (movingTaskRef.current?.id === task.id) {
      return;
    }

    console.log("Task picked up");
    movingTaskRef.current = task;
  };

  const dropTask = () => {
    console.log("Task dropped");
    movingTaskRef.current = null;
  };

  const dragTaskOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return { dragTask, dropTask, dragTaskOver };
};
