import { Column } from "../../components/column/Column";
import { TaskCard } from "../../components/task/TaskCard";
import { TTask } from "../../types/task";
import { TTaskGroup } from "../../types/taskGroup";

interface IProps {
  taskGroupList: TTaskGroup[];
}

export const TaskBoardUi = ({ taskGroupList }: IProps) => {
  const renderTaskList = (taskList: TTask[]) => {
    return taskList.map((task) => <TaskCard key={task.id} task={task} />);
  };

  return (
    <div className="h-screen-safe p-4 flex gap-x-2 bg-gray-800">
      {taskGroupList.map((taskGroup) => {
        return (
          <Column key={taskGroup.id} columnData={taskGroup}>
            {renderTaskList(taskGroup.taskList)}
          </Column>
        );
      })}
    </div>
  );
};
