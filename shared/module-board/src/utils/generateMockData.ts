import { faker } from "@faker-js/faker";
import { TPlate } from "../types/plate";
faker.seed(12345);

// -------------------------------------------- //

const generateData = <TData>(callback: (index: number) => TData, numOfItems: number) => {
  return Array.from({ length: numOfItems }).map((_, index) => callback(index));
};

const generatePlate = (parentId: string | null, count: number) => {
  const newPlate = (index: number): TPlate => {
    return {
      id: faker.string.uuid(),
      order: index,
      parentId: parentId,
      backgroundColor: faker.internet.color(),
    };
  };

  return generateData(newPlate, count);
};

export const generatePlates = () => {
  const parentPlates = generatePlate(null, 4);
  const childrenPlates = parentPlates.map((plate) => generatePlate(plate.id, 4)).flat();

  return [...parentPlates, ...childrenPlates];
};

// -------------------------------------------- //
