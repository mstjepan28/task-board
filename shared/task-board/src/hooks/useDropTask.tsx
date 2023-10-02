import { storage } from "@shared/storage";
import { useEffect, useState } from "react";
import { TTask } from "../types/task";
import { updateTask, updateTaskOrder } from "../api/taskRequests";

export const useDropTask = (columnId: string) => {
  const [updatedTaskList, setUpdatedTaskList] = useState<TTask[] | null>(null);
  const placeholderId = "skeleton-placeholder";

  // --------------------------------------------- //

  const generateSkeletonPlaceholder = () => {
    const skeletonPlaceholder = document.createElement("div");
    skeletonPlaceholder.id = placeholderId;
    skeletonPlaceholder.classList.add(
      "w-full",
      "h-24",
      "mb-2",
      "rounded-lg",
      "pointer-events-none",
      "border",
      "border-dashed",
      "border-gray-100",
      "bg-gray-800"
    );

    return skeletonPlaceholder;
  };

  const removeSkeletonPlaceholder = () => {
    document.getElementById(placeholderId)?.remove();
  };

  const getSkeletonOrderPlacement = () => {
    const columnChildren = document.getElementById(columnId)?.children;
    if (!columnChildren) {
      return 0;
    }

    for (let i = 0; i < columnChildren.length; i++) {
      const child = columnChildren[i];
      if (child.id === placeholderId) {
        return i;
      }
    }

    return columnChildren.length;
  };

  const removeOldElement = (task: TTask) => {
    const oldTaskElement = document.getElementById(`task-${task.id}`);
    if (oldTaskElement) {
      oldTaskElement.remove();
    }
  };

  // --------------------------------------------- //

  const validateTargetElement = (targetElement: HTMLElement | null) => {
    if (!targetElement) {
      return { isColumn: false, isTask: false };
    }

    const elementId = targetElement.id;

    return {
      isColumn: elementId.startsWith("col-"),
      isTask: elementId.startsWith("task-"),
    };
  };

  const handleTaskElement = (curYPosition: number, targetElement: HTMLElement) => {
    const nextSiblingIsPlaceholder = targetElement.nextElementSibling?.id === placeholderId;
    const prevSiblingIsPlaceholder = targetElement.previousElementSibling?.id === placeholderId;

    const { height, y } = targetElement.getBoundingClientRect();
    const middleOfTargetElement = y + height / 2;

    if (curYPosition > middleOfTargetElement && !nextSiblingIsPlaceholder) {
      removeSkeletonPlaceholder();
      const skeletonPlaceholder = generateSkeletonPlaceholder();

      targetElement.after(skeletonPlaceholder);
    } else if (!prevSiblingIsPlaceholder) {
      removeSkeletonPlaceholder();
      const skeletonPlaceholder = generateSkeletonPlaceholder();

      targetElement.before(skeletonPlaceholder);
    }
  };

  const handleColumnElement = (targetElement: HTMLElement) => {
    const children = targetElement.children;
    const isLastChildPlaceholder = children[children.length - 1]?.id === placeholderId;

    if (!isLastChildPlaceholder) {
      removeSkeletonPlaceholder();
      const skeletonPlaceholder = generateSkeletonPlaceholder();

      targetElement.append(skeletonPlaceholder);
    }
  };

  // --------------------------------------------- //

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    const targetElement = event.target as HTMLElement;
    const { isColumn, isTask } = validateTargetElement(targetElement);

    if (isTask) {
      handleTaskElement(event.clientY, targetElement);
    } else if (isColumn) {
      handleColumnElement(targetElement);
    }
  };

  const onDropTask = () => {
    const newOrder = getSkeletonOrderPlacement();
    removeSkeletonPlaceholder();

    const taskData = storage.getItem("move-task") as { task: TTask } | null;
    const task = taskData?.task;
    if (!task) {
      console.error("Task not found");
      return;
    }

    task.taskGroupId = columnId.split("col-")[1];
    task.order = newOrder;

    removeOldElement(task);

    updateTask(task.id, task);
    const updatedTaskList = updateTaskOrder(task);

    setUpdatedTaskList(updatedTaskList);
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

  return { updatedTaskList };
};
