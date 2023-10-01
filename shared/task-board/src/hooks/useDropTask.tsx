import { storage } from "@shared/storage";
import { useEffect } from "react";

export const useDropTask = (columnId: string) => {
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
    const isLastChildPlaceholder = children[children.length - 1].id === placeholderId;

    if (!isLastChildPlaceholder) {
      removeSkeletonPlaceholder();
      const skeletonPlaceholder = generateSkeletonPlaceholder();

      targetElement.append(skeletonPlaceholder);
    }
  };

  // --------------------------------------------- //

  const getMovingElement = () => {
    const movingTask = storage.getItem("move-task");
    console.log(movingTask);
  };

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
    removeSkeletonPlaceholder();
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
