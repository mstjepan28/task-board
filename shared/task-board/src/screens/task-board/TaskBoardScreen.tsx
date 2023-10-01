import { generateMockTaskGroups } from "../../utils/generateMockData";
import { TaskBoardUi } from "./TaskBoardUi";

export const TaskBoardScreen = () => {
  const taskGroupList = generateMockTaskGroups();
  return <TaskBoardUi taskGroupList={taskGroupList} />;
};
