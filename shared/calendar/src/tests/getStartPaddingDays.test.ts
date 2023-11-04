import { describe, it, expect } from "vitest"
import { getStartPaddingDays } from "../utils/generateDaysOfMonth";
import dayjs from "dayjs";

describe("get start padding days", () => {
  // ------------------------------------------------------------------------------------------- //

  it("should return 0 days if month starts on a monday", () => {
    const curMonth = dayjs("2023-05-01");
    const startPaddingDays = getStartPaddingDays(curMonth);

    expect(startPaddingDays).length(0);
  });
  it("should return 1 day if month starts on a tuesday", () => {
    const curMonth = dayjs("2023-08-01");
    const startPaddingDays = getStartPaddingDays(curMonth);

    expect(startPaddingDays).length(1);
  })
  it("should return 2 days if month starts on a wednesday", () => {
    const curMonth = dayjs("2023-03-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).length(2);
  })
  it("should return 3 days if month starts on a thursday", () => {
    const curMonth = dayjs("2023-06-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).length(3);
  })
  it("should return 4 days if month starts on a friday", () => {
    const curMonth = dayjs("2023-09-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).length(4);
  })
  it("should return 5 days if month starts on a saturday", () => {
    const curMonth = dayjs("2023-04-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).length(5);
  })
  it("should return 6 days if month starts on a sunday", () => {
    const curMonth = dayjs("2023-10-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).length(6);
  })

  // ------------------------------------------------------------------------------------------- //

  it("should return 1 day from previous month if month starts on a tuesday", () => {
    const curMonth = dayjs("2023-08-01");
    const startPaddingDays = getStartPaddingDays(curMonth);

    expect(startPaddingDays).toEqual([
      dayjs("2023-07-31")
    ]);
  })
  it("should return 2 days from previous month if month starts on a wednesday", () => {
    const curMonth = dayjs("2023-03-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).toEqual([
      dayjs("2023-02-27"),
      dayjs("2023-02-28")
    ]);
  })
  it("should return 3 days from previous month if month starts on a thursday", () => {
    const curMonth = dayjs("2023-06-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).toEqual([
      dayjs("2023-05-29"),
      dayjs("2023-05-30"),
      dayjs("2023-05-31")
    ]);
  })
  it("should return 4 days from previous month if month starts on a friday", () => {
    const curMonth = dayjs("2023-09-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).toEqual([
      dayjs("2023-08-28"),
      dayjs("2023-08-29"),
      dayjs("2023-08-30"),
      dayjs("2023-08-31")
    ]);
  })
  it("should return 5 days from previous month if month starts on a saturday", () => {
    const curMonth = dayjs("2023-04-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).toEqual([
      dayjs("2023-03-27"),
      dayjs("2023-03-28"),
      dayjs("2023-03-29"),
      dayjs("2023-03-30"),
      dayjs("2023-03-31")
    ]);
  })
  it("should return 6 days from previous month if month starts on a sunday", () => {
    const curMonth = dayjs("2023-10-01");
    const startPaddingDays = getStartPaddingDays(curMonth);
    
    expect(startPaddingDays).toEqual([
      dayjs("2023-09-25"),
      dayjs("2023-09-26"),
      dayjs("2023-09-27"),
      dayjs("2023-09-28"),
      dayjs("2023-09-29"),
      dayjs("2023-09-30")
    ]);
  })

  // ------------------------------------------------------------------------------------------- //

  it("should never return more then 6 days", () => {
    const startMonth = dayjs("2000-01-01");

    Array.from({ length: 1500 }).forEach((_, index) => {
      const month = startMonth.add(index, "month");
      const startPaddingDays = getStartPaddingDays(month);

      expect(startPaddingDays.length).toBeLessThanOrEqual(6);
    })
  })

  // ------------------------------------------------------------------------------------------- //
})