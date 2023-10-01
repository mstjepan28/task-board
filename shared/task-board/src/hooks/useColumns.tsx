import { useEffect, useState } from "react";
import { TTask } from "../types/task";
import { TColumn } from "../types/column";
import { generateRandomString } from "../utils/generateRandomString";

export const useColumns = (taskList?: TTask[]) => {
  const [columns, setColumns] = useState<TColumn[]>([]);

  const sortTasksByColumn = (tasksToSort: TTask[]) => {
    return tasksToSort.reduce(
      (sortedTasks, task) => {
        const { status } = task;
        const taskList = sortedTasks[status];

        if (taskList) {
          taskList.push(task);
        } else {
          sortedTasks[status] = [task];
        }

        return sortedTasks;
      },
      {} as Record<string, TTask[]>
    );
  };

  const generateColumns = (tasksByColumn: Record<string, TTask[]>) => {
    return Object.entries(tasksByColumn).map(([title, taskList]) => {
      const newColumns = {
        id: generateRandomString(),
        title,
        taskList,
      };

      return newColumns as TColumn;
    });
  };

  useEffect(() => {
    if (!taskList || taskList.length === 0) {
      return;
    }

    const taskSortedByColumn = sortTasksByColumn(taskList);
    const columnList = generateColumns(taskSortedByColumn);

    setColumns(columnList);
  }, [taskList]);

  return { columns, setColumns };
};
