export type TGridCell = {
  id: number;
  fValue: number;
  gValue: number;
  hValue: number;
  isOnClosedList: boolean;
  isOnOpenList: boolean;
  isWalkable: boolean;
  parentNode: undefined;
  position: {
    x: number;
    y: number;
  };
};
