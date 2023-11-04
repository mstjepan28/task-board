import { describe, it, expect } from "vitest"
import { getDatesForMonth, getEndPaddingDays, getStartPaddingDays } from "../utils/generateDaysOfMonth";
import dayjs from "dayjs";

const setData = (date: string) => {
  const curMonth = dayjs(date);

  const paddingDaysStart = getStartPaddingDays(curMonth);
  const daysInMonth = getDatesForMonth(curMonth, 0);

  const totalDays = [...paddingDaysStart, ...daysInMonth].length;

  return { curMonth, totalDays }
}

describe("get end padding days", () => {
  it("should return 0 days if month ends on a sunday", () => {
    const {curMonth, totalDays} = setData("2023-04-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(0);
  })
  it("should return 1 days if month ends on a saturday", () => {
    const {curMonth, totalDays} = setData("2023-09-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(1);
  })
  it("should return 2 days if month ends on a friday", () => {
    const {curMonth, totalDays} = setData("2023-06-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(2);
  })
  it("should return 3 days if month ends on a thursday", () => {
    const {curMonth, totalDays} = setData("2023-08-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(3);
  })
  it("should return 4 days if month ends on a wednesday", () => {
    const {curMonth, totalDays} = setData("2023-05-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(4);
  })
  it("should return 5 days if month ends on a tuesday", () => {
    const {curMonth, totalDays} = setData("2023-10-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(5);
  })
  it("should return 6 days if month ends on a monday", () => {
    const {curMonth, totalDays} = setData("2023-07-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(6);
  })

  it("should return 1 days if month ends on a saturday", () => {
    const {curMonth, totalDays} = setData("2023-09-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(1);
    expect(endPaddingDays).toEqual([
      dayjs("2023-10-01")
    ]);
  })
  it("should return 2 days if month ends on a friday", () => {
    const {curMonth, totalDays} = setData("2023-06-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(2);
    expect(endPaddingDays).toEqual([
      dayjs("2023-07-01"),
      dayjs("2023-07-02"),
    ]);
  })
  it("should return 3 days if month ends on a thursday", () => {
    const {curMonth, totalDays} = setData("2023-08-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(3);
    expect(endPaddingDays).toEqual([
      dayjs("2023-09-01"),
      dayjs("2023-09-02"),
      dayjs("2023-09-03"),
    ]);
  })
  it("should return 4 days if month ends on a wednesday", () => {
    const {curMonth, totalDays} = setData("2023-05-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(4);
    expect(endPaddingDays).toEqual([
      dayjs("2023-06-01"),
      dayjs("2023-06-02"),
      dayjs("2023-06-03"),
      dayjs("2023-06-04"),
    ]);
  })
  it("should return 5 days if month ends on a tuesday", () => {
    const {curMonth, totalDays} = setData("2023-10-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(5);
    expect(endPaddingDays).toEqual([
      dayjs("2023-11-01"),
      dayjs("2023-11-02"),
      dayjs("2023-11-03"),
      dayjs("2023-11-04"),
      dayjs("2023-11-05"),
    ]);
  })
  it("should return 6 days if month ends on a monday", () => {
    const {curMonth, totalDays} = setData("2023-07-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays);

    expect(endPaddingDays).length(6);
    expect(endPaddingDays).toEqual([
      dayjs("2023-08-01"),
      dayjs("2023-08-02"),
      dayjs("2023-08-03"),
      dayjs("2023-08-04"),
      dayjs("2023-08-05"),
      dayjs("2023-08-06"),
    ]);
  })

  it("should return 7 extra days when passing a third parameter as true", () => {
    const {curMonth, totalDays} = setData("2023-04-01");
    const endPaddingDays = getEndPaddingDays(curMonth, totalDays, true);

    expect(endPaddingDays).length(7);
  })
})