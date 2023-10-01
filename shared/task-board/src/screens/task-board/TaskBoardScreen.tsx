import { getTaskGroupList } from "../../api/taskGroupRequests";
import { TaskBoardUi } from "./TaskBoardUi";

export const TaskBoardScreen = () => {
  const taskGroupList = getTaskGroupList();
  return <TaskBoardUi taskGroupList={taskGroupList} />;
};
