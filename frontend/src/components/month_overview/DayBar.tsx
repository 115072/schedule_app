import { useSelectedDayContext, type IDayData } from "../../SelectedDayContext";
import "./DayBar.css";

const DayBar = ({ day, month }: IDayData) => {
  const { setter: setSelDay } = useSelectedDayContext();

  return (
    <div className="day-cont">
      <a>{day}</a>
      <div
        className="day-prog-bar"
        onClick={() => setSelDay({ day, month })}
      ></div>
    </div>
  );
};

export default DayBar;
