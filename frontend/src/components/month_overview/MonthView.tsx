import { useState } from "react";
import DayBar from "./DayBar.tsx";
import "./MonthView.css";

const MonthView = () => {
  const daysInMonths: [string, number][] = [
    ["January", 31],
    ["February", 28],
    ["March", 31],
    ["April", 30],
    ["May", 31],
    ["June", 30],
    ["July", 31],
    ["August", 31],
    ["September", 30],
    ["October", 31],
    ["November", 30],
    ["December", 31],
  ];

  const [currMonth, setCurrMonth] = useState(0);

  function prevMonth() {
    setCurrMonth(currMonth == 0 ? 11 : currMonth - 1);
  }

  function nextMonth() {
    setCurrMonth(currMonth == 11 ? 0 : currMonth + 1);
  }

  return (
    <div>
      <div className="month-header">
        <a onClick={prevMonth}>prev</a>
        <h2>{daysInMonths[currMonth][0]}</h2>
        <a onClick={nextMonth}>next</a>
      </div>
      {Array.from({ length: daysInMonths[currMonth][1] }, (_, i) => (
        <DayBar day={i + 1} month={daysInMonths[currMonth][0]}></DayBar>
      ))}
    </div>
  );
};

export default MonthView;
