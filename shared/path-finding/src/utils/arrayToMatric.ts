export const arrayToMatrix = <T extends object>(arr: T[], rowLength: number): T[][] => {
  if (rowLength <= 0) {
    throw new Error("Invalid row length");
  } else if (arr.length < rowLength) {
    throw new Error("Row length cannot be greater than array length");
  }

  const matrix: T[][] = [];

  for (let i = 0; i < arr.length; i += rowLength) {
    const row = arr.slice(i, i + rowLength);
    matrix.push(row);
  }

  return matrix;
};
