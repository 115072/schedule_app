import { useEffect, useState } from "react";
import { getMonthName } from "@/utils/translateMonthNum";

import DayBar from "@/components/month_overview/DayBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMonth, selectDays, setSelDay } from "@/store/daysSlice";

const MonthView = () => {
  const [currMonth, setCurrMonth] = useState(new Date().getUTCMonth());
  const dispatch = useAppDispatch();
  const days = useAppSelector(selectDays);
  // const tags = useAppSelector(selectTags);

  useEffect(() => {
    dispatch(fetchMonth(currMonth)).then(() => {
      if (currMonth === new Date().getUTCMonth())
        dispatch(setSelDay(new Date().getUTCDate()));
    });
  }, [currMonth, dispatch]);

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
        {days.days.map((_, i) => (
          <DayBar day={days.days[i]} key={i}></DayBar>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
