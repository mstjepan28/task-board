import { AuthContext } from "@services/auth";
import { FirebaseContext } from "@services/firebase";
import { debounce, useFilters } from "@services/utils";
import { z } from "@services/validation";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { QueryKeys } from "../enums/queryKeys";
import { taskSchema } from "../schema/taskSchema";
import type { TTaskListFilters } from "../types/taskListFilters";
import { ALL_VALUE_FILTER } from "../utils/constants";

interface IProps {
  fetchOnLoad?: boolean;
}

const initFilters: TTaskListFilters = {
  status: ALL_VALUE_FILTER,
  search: "",
  page: "1",
};

export const useTaskList = (options?: IProps) => {
  const { getTasksForCurrentUser } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);

  const { setFilters, filters } = useFilters<TTaskListFilters>({ initFilters });
  const { fetchOnLoad = true } = options || {};

  const fetchingList = useQuery({
    queryKey: [QueryKeys.TASK_LIST, filters, authUser?.id],
    queryFn: async () => {
      if (!authUser) {
        return [];
      }

      const response = await getTasksForCurrentUser(authUser?.id);
      const { error, success, data } = z.array(taskSchema).safeParse(response);

      if (success) {
        return data;
      }

      console.error("Error fetching task list: ", JSON.stringify(error.issues, null, 2));
      return [];
    },
    enabled: !!authUser && fetchOnLoad,
  });

  return {
    dataList: fetchingList.data ?? [],

    search: debounce(250, (search: string) => setFilters({ search, page: "1" })),
    setFilters,
    filters,

    loading: {
      fetching: fetchingList.isLoading,
    },
  };
};
