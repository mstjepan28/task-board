import { useEffect, useState } from "react";
import { getTaskGroupList } from "../../api/taskGroupRequests";
import { getTaskListByGroup, updateTask, updateTaskOrder } from "../../api/taskRequests";
import { TTask } from "../../types/task";
import { TTaskGroup } from "../../types/taskGroup";

export const useTask = () => {
  const [taskGroupList, setTaskGroupList] = useState<TTaskGroup[]>([]);

  const getSortedTaskList = () => {
    const sortedTasks = getTaskGroupList().map((taskGroup) => {
      const taskList = getTaskListByGroup(taskGroup.id);
      return { ...taskGroup, taskList };
    });

    setTaskGroupList(sortedTasks);
  };

  const onTaskMove = (task: TTask | null) => {
    if (!task) {
      return;
    }

    // updateTask(task);
    // updateTaskOrder(task);

    getSortedTaskList();
  };

  useEffect(() => {
    getSortedTaskList();
  }, []);

  return { onTaskMove, taskGroupList };
};
