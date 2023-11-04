import { useEffect, useMemo, useState } from "react";
import { TPlate } from "../../types/plate";
import { storage } from "@shared/storage";
import { generatePlates } from "../../utils/generateMockData";

export const usePlates = () => {
  const [plateList, setPlateList] = useState<TPlate[]>([]);

  const { childPlateList, parentPlateList } = useMemo(() => {
    const init = {
      childPlateList: [] as TPlate[],
      parentPlateList: [] as TPlate[],
    };

    const sortedPlates = plateList.reduce((prev, cur) => {
      if (cur.parentId) {
        prev.childPlateList.push(cur);
      } else {
        prev.parentPlateList.push(cur);
      }
      return prev;
    }, init);

    return sortedPlates;
  }, [plateList]);

  const getPlates = () => {
    const cachedData = storage.getItem("plate-list");
    if (cachedData) {
      return cachedData as TPlate[];
    }

    const generatedData = generatePlates();
    storage.setItem("plate-list", generatedData);

    return generatedData;
  };

  const getPlatesByParentId = (parentId: string) => {
    const plateList = getPlates();
    return plateList.filter((plate) => plate.parentId === parentId);
  };

  const onPlateMove = (updatedPlate: TPlate | null) => {
    if (!updatedPlate) {
      return;
    }

    // TODO: update plates

    const plateList = getPlates();
    setPlateList(plateList);
  };

  useEffect(() => {
    const plateList = getPlates();
    setPlateList(plateList);
  }, []);

  return { childPlateList, parentPlateList, plateList, onPlateMove };
};
