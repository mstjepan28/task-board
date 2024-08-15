import { LoadingIndicator, Searchbar } from "@services/ui";
import { useTaskList } from "../hooks/useTaskList";
import { TaskCard } from "../components/TaskCard";
import { MdOutlineAddTask } from "react-icons/md";
import { Link } from "@services/navigation";

export const TaskListScreen = () => {
  const taskList = useTaskList();

  return (
    <div className="h-full flex flex-col px-2 py-4">
      <div className="flex gap-x-2 pb-4">
        <Searchbar searchValue={taskList.filters.search} searchFn={taskList.search} />

        <Link
          to="/task/create"
          type="button"
          className="flex items-center px-3 rounded-lg border border-gray-300 bg-gray-50"
        >
          <MdOutlineAddTask size={20} />
        </Link>
      </div>

      {taskList.loading.fetching ? (
        <LoadingIndicator size="xl" />
      ) : (
        <div className="basis-full flex flex-col gap-y-4">
          {taskList.dataList.map((task, index) => {
            return <TaskCard key={task.id + index} task={task} />;
          })}
        </div>
      )}
    </div>
  );
};
