import { storage } from "@shared/storage";
import { useEffect, useState } from "react";
import { updateTask, updateTaskOrder } from "../api/taskRequests";
import { TPlate } from "../types/plate";

export const useDropPlate = (columnId: string) => {
  const [movedTask, setMovedTask] = useState<TPlate | null>(null);
  const placeholderId = "skeleton-placeholder";

  // --------------------------------------------- //

  const generateSkeletonPlaceholder = () => {
    const skeletonPlaceholder = document.createElement("div");
    skeletonPlaceholder.id = placeholderId;
    skeletonPlaceholder.classList.add(
      "w-full",
      "h-24",
      "rounded-lg",
      "border",
      "border-dashed",
      "border-gray-100",
      "bg-gray-800"
    );

    return skeletonPlaceholder;
  };

  const removeSkeletonPlaceholder = () => {
    const skeleton = document.getElementById(placeholderId);
    if (skeleton) {
      skeleton.remove();
    }
  };

  const getChildrenIdList = (taskId: string) => {
    const columnChildren = document.getElementById(columnId)?.children;
    if (!columnChildren) {
      return [];
    }

    return Array.from(columnChildren)
      .map((child) => child.id.replace("task-", ""))
      .filter((childId) => childId !== taskId)
      .map((childId) => (childId === placeholderId ? taskId : childId));
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
    const taskData = storage.getItem("move-item") as { task: TPlate } | null;
    const task = taskData?.task;
    if (!task) {
      console.error("Task not found");
      return;
    }

    const taskOrder = getChildrenIdList(task.id);
    removeSkeletonPlaceholder();

    task.containerId = columnId.split("col-")[1];

    updateTask(task);
    updateTaskOrder(task.containerId, taskOrder);

    setMovedTask(task);
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

  return { movedTask };
};
