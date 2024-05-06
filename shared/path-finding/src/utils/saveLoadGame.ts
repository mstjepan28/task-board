import { storage } from "@services/storage";
import type { TGridCell } from "../types/gridTypes";

const PATH_FINDER_GRID = "path-finder-grid";

export const saveState = (gridState: TGridCell[]) => {
  storage.setItem(PATH_FINDER_GRID, gridState);
};

export const loadState = () => {
  return storage.getItem<TGridCell[]>(PATH_FINDER_GRID);
};

export const clearState = () => {
  storage.removeItem(PATH_FINDER_GRID);
};
