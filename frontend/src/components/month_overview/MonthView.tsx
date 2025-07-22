import { useState } from "react";
import { getMonthName, getMonthDays } from "@/utils/translateMonthNum";

import DayBar from "@/components/month_overview/DayBar";

const MonthView = () => {
  const [currMonth, setCurrMonth] = useState(0);

  function prevMonth() {
    setCurrMonth(currMonth === 0 ? 11 : currMonth - 1);
  }

  function nextMonth() {
    setCurrMonth(currMonth === 11 ? 0 : currMonth + 1);
  }

  return (
    <div className="mx-4 overflow-scroll">
      <div className="grid grid-cols-3 sticky top-0 bg-neutral-300 dark:bg-neutral-900 h-10 items-center text-center">
        <a onClick={prevMonth} className="text-4xl cursor-pointer select-none">
          {"<"}
        </a>
        <h2 className="text-2xl">{getMonthName(currMonth)}</h2>
        <a onClick={nextMonth} className="text-4xl cursor-pointer select-none">
          {">"}
        </a>
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: getMonthDays(currMonth) }, (_, i) => (
          <DayBar date={new Date(2025, currMonth, i + 2)} key={i}></DayBar>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
