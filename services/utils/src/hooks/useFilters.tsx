import { useLocation, useNavigate, useSearchParams } from "@services/navigation";
import { useCallback, useMemo } from "react";
import { removeEmptyValues } from "../util-functions/removeEmptyValues";

type TFilters<T> = Record<keyof T, string>;

interface IProps<T> {
  initFilters: TFilters<T>;
}

export const useFilters = <T extends Record<string, string>>({ initFilters }: IProps<T>) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Loop trough the filter key list and build a filter object based with the
   * return value of the passed callback function.
   */
  const loopTroughFilters = useCallback(
    (callback: (filterKey: string) => string) => {
      return Object.keys(initFilters).reduce<Record<string, string>>((acc, key) => {
        if (typeof key !== "string") {
          console.error(`useFilters: Filter key must be a string, received type ${typeof key}`);
          return acc;
        }

        const filterValue = callback(key);
        if (filterValue) {
          acc[key] = filterValue;
        }

        return acc;
      }, {});
    },
    [initFilters],
  );

  /**
   * Filters extracted from the URL search params based on the provided filter keys.
   */
  const filters = useMemo(() => {
    return loopTroughFilters((key) => {
      return searchParams.get(key) ?? initFilters[key];
    }) as T;
  }, [searchParams, loopTroughFilters, initFilters]);

  /**
   * Combines the new and the current filters while removing the empty values.
   */
  const formatFilters = (newFilters: Partial<Record<keyof T, string>>): TFilters<T> => {
    const newFilterCollection = loopTroughFilters((key) => {
      return newFilters[key] ?? filters[key] ?? initFilters[key];
    });

    return removeEmptyValues(newFilterCollection, false) as TFilters<T>;
  };

  /**
   * Sets the new filters in the URL search params.
   */
  const setFilters = (newFilters: Partial<Record<keyof T, string>>) => {
    const formattedFilters = formatFilters(newFilters);
    const encodedFilters = new URLSearchParams(formattedFilters).toString();

    navigate(`${location.pathname}?${encodedFilters}`);
  };

  return {
    formatFilters,
    setFilters,
    filters,
  };
};
