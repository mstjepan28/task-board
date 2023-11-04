import { Dayjs } from "dayjs";
import { chunkArray } from "./chunkArray";

export const getDatesForMonth = (curMonth: Dayjs, monthOffset: number = 0) => {
  const month = curMonth.add(monthOffset, "month")
  const numOfDaysInMonth = month.daysInMonth();

  return Array.from({ length: numOfDaysInMonth }).map((_, index) => {
    return month.set("date", index + 1).startOf("day");
  });
};

export const getStartPaddingDays = (curMonth: Dayjs) => {
  const startDayOfWeek = curMonth.date(1).day();

  // check if month start on a monday
  if (startDayOfWeek === 1) {
    return [];
  }

  const daysInPrevMonth = getDatesForMonth(curMonth, -1);
  
  const firstDateIndexToTake = daysInPrevMonth.length - ((startDayOfWeek + 6) % 7);
  return daysInPrevMonth.slice(firstDateIndexToTake, );
};

export const getEndPaddingDays = (curMonth: Dayjs, totalDays: number, forceSixRows = false) => {
  let numOfDaysToFillIn = Math.ceil(totalDays / 7) * 7 - totalDays;
  const willNotHaveSixRows = numOfDaysToFillIn + totalDays < 42;

  if (forceSixRows && willNotHaveSixRows) {
    numOfDaysToFillIn += 7;
  }

  return getDatesForMonth(curMonth, 1).slice(0, numOfDaysToFillIn)
};

export const getDaysOfMonth = (curMonth: Dayjs) => {
  const paddingDaysStart = getStartPaddingDays(curMonth);
  const daysInMonth = getDatesForMonth(curMonth, 0);

  const totalDays = [...paddingDaysStart, ...daysInMonth].length;

  const paddingDaysEnd = getEndPaddingDays(curMonth, totalDays, true);

  return chunkArray([...paddingDaysStart, ...daysInMonth, ...paddingDaysEnd]);
};
