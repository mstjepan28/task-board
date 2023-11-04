import { describe, it, expect } from "vitest"
import { chunkArray } from "../utils/chunkArray";

describe("chunk array", () => {
  const generateArray = (length: number) => Array.from({ length }).map((_, index) => index);

  it("should chunk array of 21 items into three arrays of 7 items", () => {
    const arrayToChunk = generateArray(21);
    const chunkedArray = chunkArray(arrayToChunk);

    expect(chunkedArray).toHaveLength(3);

    expect(chunkedArray[0]).toHaveLength(7);
    expect(chunkedArray[1]).toHaveLength(7);
    expect(chunkedArray[2]).toHaveLength(7);
  })
  it("should chunk array of 20 items into three arrays with with 7, 7 and 6 items in them", () => {
    const arrayToChunk = generateArray(20);
    const chunkedArray = chunkArray(arrayToChunk);

    expect(chunkedArray).toHaveLength(3);

    expect(chunkedArray[0]).toHaveLength(7);
    expect(chunkedArray[1]).toHaveLength(7);
    expect(chunkedArray[2]).toHaveLength(6);
  })
  it("should chunk array of 10 items into two arrays of 5 items when passing second argument as 5", () => {
    const arrayToChunk = generateArray(10);
    const chunkedArray = chunkArray(arrayToChunk, 5);

    expect(chunkedArray).toHaveLength(2);

    expect(chunkedArray[0]).toHaveLength(5);
    expect(chunkedArray[1]).toHaveLength(5);
  })
})