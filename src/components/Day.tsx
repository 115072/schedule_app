import React from "react";
import "./Day.css";
// import DayEntry from "./DayEntry";

const Day = ({ dayNo }) => {
  return (
    <div className="day-cont">
      <a>{dayNo}</a>
      <div className="day-prog-bar"></div>
    </div>
  );
};

export default Day;
