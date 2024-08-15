import { debounce, useFilters } from "@services/utils";
import type { TTaskListFilters } from "../types/taskListFilters";
import { ALL_VALUE_FILTER } from "../utils/constants";
import { QueryKeys } from "../enums/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskList } from "../api/taskListRequests";

interface IProps {
  fetchOnLoad?: boolean;
}

const initFilters: TTaskListFilters = {
  status: ALL_VALUE_FILTER,
  search: "",
  page: "1",
};

export const useTaskList = (options?: IProps) => {
  const { fetchOnLoad = true } = options || {};

  const { setFilters, filters } = useFilters<TTaskListFilters>({ initFilters });

  const fetchingList = useQuery({
    queryKey: [QueryKeys.TASK_LIST, filters],
    queryFn: async () => fetchTaskList(filters),
    enabled: fetchOnLoad,
  });

  return {
    dataList: fetchingList.data?.data ?? [],
    totalPages: fetchingList.data?.totalPages ?? 1,

    search: debounce(250, (search: string) => setFilters({ search, page: "1" })),
    setFilters,
    filters,

    loading: {
      fetching: fetchingList.isLoading,
    },
  };
};
