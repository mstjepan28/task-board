export const chunkArray = <T>(arrayToChunk: T[], chunkSize: number = 7) => {
  const chunkedArray = [] as T[][];

  for (let i = 0; i < arrayToChunk.length; i += chunkSize) {
    const chunk = arrayToChunk.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
};