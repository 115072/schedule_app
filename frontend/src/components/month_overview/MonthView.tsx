import { useState } from "react";
import DayBar from "./DayBar.tsx";
import "./MonthView.css";
import { getMonthName, getMonthDays } from "../../utils.ts";

const MonthView = () => {
  const [currMonth, setCurrMonth] = useState(1);

  function prevMonth() {
    setCurrMonth(currMonth == 1 ? 12 : currMonth - 1);
  }

  function nextMonth() {
    setCurrMonth(currMonth == 12 ? 1 : currMonth + 1);
  }

  return (
    <div>
      <div className="month-header">
        <a onClick={prevMonth}>prev</a>
        <h2>{getMonthName(currMonth)}</h2>
        <a onClick={nextMonth}>next</a>
      </div>
      {Array.from({ length: getMonthDays(currMonth) }, (_, i) => (
        <DayBar day={i + 1} month={currMonth} key={i}></DayBar>
      ))}
    </div>
  );
};

export default MonthView;
