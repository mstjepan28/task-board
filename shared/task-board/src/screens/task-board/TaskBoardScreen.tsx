import { getTaskGroupList } from "../../api/taskGroupRequests";
import { getTaskListByGroup } from "../../api/taskRequests";
import { TaskBoardUi } from "./TaskBoardUi";

export const TaskBoardScreen = () => {
  const taskGroupList = getTaskGroupList().map((taskGroup) => {
    const taskList = getTaskListByGroup(taskGroup.id);
    return { ...taskGroup, taskList };
  });

  return <TaskBoardUi taskGroupList={taskGroupList} />;
};
