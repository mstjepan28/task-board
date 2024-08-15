import type { TCompletionStatus } from "../enums/completionStatus";
import type { ALL_VALUE_FILTER } from "../utils/constants";

export type TTaskListFilters = {
  status: TCompletionStatus | typeof ALL_VALUE_FILTER;
  search: string;
  page: string;
};
