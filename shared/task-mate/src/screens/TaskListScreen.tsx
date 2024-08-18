import { Link } from "@services/navigation";
import { LoadingIndicator, Searchbar } from "@services/ui";
import { MdOutlineAddTask } from "react-icons/md";
import { TaskCard } from "../components/TaskCard";
import { useTaskList } from "../hooks/useTaskList";

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
      ) : taskList.dataList.length === 0 ? (
        <div className="flex flex-col items-center py-8">
          <span className="text-2xl  italic">No tasks found</span>
          <span>
            Click{" "}
            <Link to="/task/create" className="text-blue-500 underline">
              here
            </Link>{" "}
            to create a new task
          </span>
        </div>
      ) : (
        <div className="basis-full flex flex-col gap-y-4 pb-4">
          {taskList.dataList.map((task, index) => {
            return <TaskCard key={task.id + index} task={task} />;
          })}
        </div>
      )}
    </div>
  );
};
