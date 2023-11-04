import { describe, it, expect } from "vitest"
import { getDatesForMonth } from "../utils/generateDaysOfMonth";
import dayjs from "dayjs";

describe("get dates for month", () => {
  it("should return 31 days for months with 31 days", () => {
    const curMonth = dayjs("2023-01-01");
    const days = getDatesForMonth(curMonth);

    expect(days).length(31);
  })
  it("should return 30 days for months with 30 days", () => {
    const curMonth = dayjs("2023-04-01");
    const days = getDatesForMonth(curMonth);

    expect(days).length(30);
  })
  it("should return 29 days for months with 29 days", () => {
    const curMonth = dayjs("2024-02-01");
    const days = getDatesForMonth(curMonth);

    expect(days).length(29);
  })
  it("should return 28 days for months with 28 days", () => {
    const curMonth = dayjs("2023-02-01");
    const days = getDatesForMonth(curMonth);

    expect(days).length(28);
  })
  it("should return correct number of days for next month when passing month offset as 1", () => {
    const curMonth = dayjs("2022-12-01");
    const days = getDatesForMonth(curMonth, 1);

    expect(days).length(31);
  })
  it("should return correct number of days for previous month when passing month offset as -1", () => {
    const curMonth = dayjs("2023-02-01");
    const days = getDatesForMonth(curMonth, -1);

    expect(days).length(31);
  })
})

