import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { getDaysOfMonth } from "./utils/generateDaysOfMonth";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const daysOfWeek = useMemo(() => {
    const days = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

    return days.map((day, index) => {
      return (
        <div key={index} className="text-center">
          {day}
        </div>
      );
    });
  }, []);

  const renderDaysOfWeek = (daysOfWeek: Dayjs[]) => {
    return daysOfWeek.map((day) => {
      const key = day.format("DD-MM-YYYY");

      return (
        <div key={key} className="flex items-center justify-center rounded-full hover:bg-white">
          {day.format("DD")}
        </div>
      );
    });
  };

  const renderWeeks = () => {
    const weeksOfMonth = getDaysOfMonth(selectedDate);
    return weeksOfMonth.map((week) => renderDaysOfWeek(week));
  };

  return (
    <div className="group relative select-none">
      <div className="px-4 py-1 border uppercase font-bold cursor-pointer bg-white rounded-lg dark:bg-slate-800 dark:border-white">
        Kalendar
      </div>
      <div className="w-96 absolute _hidden py-1 px-2 rounded-lg border group-hover:block">
        <div className="flex items-center justify-center">{selectedDate.format("MMMM YYYY")}</div>
        <div className="grid grid-cols-7 gap-x-4">{daysOfWeek}</div>

        <div className="grid grid-cols-7 gap-x-4 gap-y-2">{renderWeeks()}</div>
      </div>
    </div>
  );
};
